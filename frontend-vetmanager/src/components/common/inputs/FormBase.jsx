export function FormBase ({ children }) {
    return (
        <div className="p-4 rounded-md border-blue-800 border-solid border-2 overflow-hidden hover:bg-blue-50 dark:hover:bg-gray-900">
            {children}
        </div>
    )
}