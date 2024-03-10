import clsx from "clsx"

function colorClassesFactory(color, flat, outline) {
    if (flat) {
        switch (color) {
            case "secondary":
                return "text-green-800"
            default:
                return "text-violet-800"
        }
    }

    if (outline) {
        switch (color) {
            case "secondary":
                return "border border-green-800 text-green-800"
            default:
                return "border border-violet-800 text-violet-800"
        }
    }

    switch (color) {
        case "secondary":
            return "border bg-green-800 border-white-400 text-white"
        default:
            return "border bg-violet-800 border-white-400 text-white"
    }
}

export function Btn ({
    children,
    type = "button",
    color = "primary",
    flat = false,
    outline = false,
    onClick,
    className,
}) {
    if (flat && outline) {
        throw Error("A button can't be flat and outline at the same time.")
    }

    const baseClasses = "rounded-lg py-2 px-6"

    const colorClasses = colorClassesFactory(color, flat, outline)

    return (
        <button
            type={type}
            className={clsx(baseClasses, colorClasses, className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}