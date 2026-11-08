const API_URL = import.meta.env.VITE_BASE_URL;

const baseHeaders = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

function getAuthHeaders() {
	const token = localStorage.getItem("token");
	return {
		...baseHeaders,
		Authorization: `Bearer ${token}`,
	};
}

export async function getPlans() {
	const response = await fetch(`${API_URL}/subscriptions/plans`, {
		headers: getAuthHeaders(),
	});
	return response.json();
}

export async function getStatus() {
	const response = await fetch(`${API_URL}/subscriptions/status`, {
		headers: getAuthHeaders(),
	});
	return response.json();
}

export async function createPreference(plan) {
	const response = await fetch(`${API_URL}/subscriptions/create`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ plan }),
	});
	return response.json();
}

export async function verifyPayment(payload) {
	const response = await fetch(`${API_URL}/subscriptions/verify`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify(payload),
	});
	return response.json();
}
