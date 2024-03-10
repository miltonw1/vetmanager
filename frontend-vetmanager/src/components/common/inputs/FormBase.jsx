export function FormBase ({ children }) {
    return (
        <div className="p-4 rounded-md border-violet-800 border-solid border-2 overflow-hidden hover:bg-violet-50 dark:hover:bg-gray-900">
            {children}
        </div>
    )
}