import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Btn } from "@/components/common/Btn";
import { useSubscriptionStore } from "@s/subscriptions.store";

const statusMessages = {
	approved: "¡Pago aprobado! Tu plan fue activado.",
	pending: "Tu pago está pendiente de acreditación.",
	failure: "El pago no pudo completarse. Podés intentarlo nuevamente.",
};

const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 3 * 60 * 1000;

export default function PlansPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [payingPlan, setPayingPlan] = useState(null);
	const [polling, setPolling] = useState(false);
	const [syncing, setSyncing] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const pollRef = useRef(null);

	const { plans, status, getPlans, getStatus, createPreference, verifyPayment } =
		useSubscriptionStore();

	useEffect(() => {
		getPlans();
		getStatus();
	}, [getPlans, getStatus]);

	useEffect(() => {
		return () => {
			if (pollRef.current) clearInterval(pollRef.current);
		};
	}, []);

	useEffect(() => {
		const paymentStatus = searchParams.get("status");
		if (!paymentStatus) return;

		setMessage(statusMessages[paymentStatus] ?? "");

		const paymentId = searchParams.get("payment_id");
		const subscriptionId = searchParams.get("subscription_id");

		if ((paymentStatus === "approved" || paymentStatus === "pending") && subscriptionId) {
			verifyPayment({
				subscription_id: subscriptionId,
				payment_id: paymentId ?? undefined,
			}).then((data) => {
				if (data?.applied) setMessage(statusMessages.approved);
				getStatus();
			});
		}

		const next = new URLSearchParams(searchParams);
		next.delete("status");
		next.delete("payment_id");
		next.delete("subscription_id");
		setSearchParams(next, { replace: true });
	}, [searchParams, setSearchParams, verifyPayment, getStatus]);

	function stopPolling() {
		if (pollRef.current) {
			clearInterval(pollRef.current);
			pollRef.current = null;
		}
		setPolling(false);
	}

	function startPolling() {
		stopPolling();
		setPolling(true);
		setMessage("Esperando la confirmación del pago...");

		const startedAt = Date.now();

		pollRef.current = setInterval(async () => {
			try {
				const data = await verifyPayment({});

				if (data?.applied) {
					stopPolling();
					setMessage(statusMessages.approved);
					return;
				}

				if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
					stopPolling();
					setMessage(
						'Todavía no detectamos el pago. Si ya pagaste, presioná "Ya pagué".',
					);
				}
			} catch {
				// seguimos intentando
			}
		}, POLL_INTERVAL_MS);
	}

	async function handlePay(plan) {
		setError("");
		setMessage("");
		setPayingPlan(plan.id);

		try {
			const data = await createPreference(plan.id);
			const sandbox = import.meta.env.DEV || import.meta.env.VITE_MP_SANDBOX === "true";
			const url = sandbox ? data.sandbox_init_point || data.init_point : data.init_point;

			if (!url) {
				throw new Error("No se pudo generar el link de pago.");
			}

			if (sandbox) {
				const tab = window.open(url, "_blank");

				if (!tab) {
					window.location.href = url;
					return;
				}

				startPolling();
			} else {
				window.location.href = url;
			}
		} catch (e) {
			setError(e.message || "No se pudo iniciar el pago.");
		} finally {
			setPayingPlan(null);
		}
	}

	async function handleSync() {
		setError("");
		setSyncing(true);

		try {
			const data = await verifyPayment({});
			if (data?.applied) {
				setMessage(statusMessages.approved);
			} else {
				setMessage("No detectamos un pago aprobado todavía.");
			}
			getStatus();
		} catch {
			setError("No se pudo verificar el pago.");
		} finally {
			setSyncing(false);
		}
	}

	const active = status?.active;
	const daysRemaining = status?.days_remaining ?? 0;

	return (
		<MainLayout title="Planes">
			<div className="p-4 flex flex-col gap-6">
				<div className="bg-white dark:bg-gray-700 p-4 rounded-md">
					{status ? (
						<p className="text-sm">
							{active ? (
								<>
									Estado: <strong>activo</strong>
									{status.is_trial ? " (prueba)" : ""} — te quedan{" "}
									<strong>{daysRemaining}</strong> días.
								</>
							) : (
								<span className="text-red-600">
									Tu cuenta está vencida y en modo solo lectura. Elegí un plan para
									reactivarla.
								</span>
							)}
						</p>
					) : (
						<p className="text-sm text-gray-500">Cargando estado de la suscripción...</p>
					)}
				</div>

				{message && (
					<p className="text-sm text-blue-800 dark:text-blue-300">{message}</p>
				)}
				{error && <p className="text-sm text-red-600">{error}</p>}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className="bg-white dark:bg-gray-700 p-6 rounded-md border-2 border-blue-800 flex flex-col gap-3"
						>
							<h2 className="text-xl font-bold">{plan.title}</h2>
							<p className="text-sm text-gray-500 dark:text-gray-300">{plan.description}</p>
							<p className="text-2xl font-bold text-blue-800 dark:text-blue-400">
								${plan.price.toLocaleString("es-AR")}
								<span className="text-sm font-normal"> {plan.currency}</span>
							</p>
							<Btn
								className="mt-auto"
								onClick={() => handlePay(plan)}
								disabled={payingPlan === plan.id || polling}
							>
								{payingPlan === plan.id ? "Redirigiendo..." : "Contratar"}
							</Btn>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-3">
						<Btn outline onClick={handleSync} disabled={syncing}>
							{syncing ? "Verificando..." : "Ya pagué"}
						</Btn>
						{polling && (
							<span className="text-sm text-gray-500">
								Buscando tu pago automáticamente...
							</span>
						)}
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						Si ya pagaste y los días no se actualizaron, presioná "Ya pagué" para
						buscar el pago en Mercado Pago y aplicar los días a tu cuenta.
					</p>
				</div>
			</div>
		</MainLayout>
	);
}
