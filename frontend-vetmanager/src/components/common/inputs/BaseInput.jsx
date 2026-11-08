import clsx from "clsx";

export function BaseInput ({
    placeholder,
    type,
    id,
    label,
    value,
    onChange,
    className,
    error,
    ...props
}) {
    return (
        <div>
            <label
                className="block"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={clsx(
                    "block rounded-md border bg-white text-gray-900 placeholder:text-gray-400 px-3 h-10",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    "dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400",
                    error ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-gray-600",
                    className
                )}
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

}