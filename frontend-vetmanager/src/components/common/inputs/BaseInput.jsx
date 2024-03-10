import clsx from "clsx";

export function BaseInput ({
    placeholder,
    type,
    id,
    label,
    value,
    onChange,
    className,
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
                className={clsx("block rounded-md border border-gray-300 text-white pl-2 h-10", className)}
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );

}