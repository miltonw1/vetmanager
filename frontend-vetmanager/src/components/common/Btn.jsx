import clsx from "clsx"

function colorClassesFactory(color, flat, outline) {
    const isSecondary = color === "secondary"

    if (flat) {
        return isSecondary
            ? "text-green-700 dark:text-green-300 hover:underline"
            : "text-blue-800 dark:text-blue-300 hover:underline"
    }

    if (outline) {
        return isSecondary
            ? "border border-green-700 text-green-800 hover:bg-green-50 dark:border-green-300 dark:text-green-300 dark:hover:bg-gray-700"
            : "border border-blue-700 text-blue-800 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-700"
    }

    return isSecondary
        ? "bg-green-700 text-white hover:bg-green-800 focus:ring-green-500"
        : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500"
}

export function Btn ({
    children,
    type = "button",
    color = "primary",
    flat = false,
    outline = false,
    onClick,
    className,
    disabled = false,
}) {
    if (flat && outline) {
        throw Error("A button can't be flat and outline at the same time.")
    }

    const baseClasses = "rounded-lg py-2 px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"

    const colorClasses = colorClassesFactory(color, flat, outline)

    return (
        <button
            type={type}
            className={clsx(baseClasses, colorClasses, disabled && "opacity-50 cursor-not-allowed", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
