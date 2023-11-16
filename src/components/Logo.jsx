import React from "react"
import { FaFeatherAlt } from "react-icons/fa"

export default function Logo({ className }) {
    return (
        <div
            className={`flex items-center gap-1 text-3xl text-gray-900 ${className}`}
        >
            <FaFeatherAlt />
            <p className="font-[Arthemis] font-semibold">Bloggie</p>
        </div>
    )
}
