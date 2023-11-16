import React from "react"
import { useId } from "react"

export default React.forwardRef(function Select(
    { label, className = "", options = [], ...props },
    ref
) {
    const id = useId()

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="">{label}</label>}
            <select
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none duration-200 focus:bg-gray-50 ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})
