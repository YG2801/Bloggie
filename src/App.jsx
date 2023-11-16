import React, { useState, useEffect } from "react"
import { Header } from "./components/index"
import { Footer } from "./components/index"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"

export default function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return !loading ? (
        <div className="flex min-h-screen flex-col justify-between">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : null
}
