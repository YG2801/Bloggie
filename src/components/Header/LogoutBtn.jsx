import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom"

export default function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        authService
            .logout()
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                navigate("/")
            })
    }
    return (
        <button
            className="inline-bock rounded-full px-6 py-2 text-[var(--light)] transition hover:bg-[var(--light)] hover:text-gray-800"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}
