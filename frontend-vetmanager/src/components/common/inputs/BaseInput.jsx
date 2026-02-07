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
                className={clsx("block rounded-md border border-gray-300 text-white pl-2 h-10", className, {
                    "border-red-500": !!error
                })}
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