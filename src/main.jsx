import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store/store.js"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import { AuthLayout } from "./components/index.js"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route
                        path="login"
                        element={
                            <AuthLayout authentication={false}>
                                <Login />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="signup"
                        element={
                            <AuthLayout authentication={false}>
                                <SignUp />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="all-posts"
                        element={
                            <AuthLayout authentication>
                                <AllPosts />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="add-post"
                        element={
                            <AuthLayout authentication>
                                <AddPost />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="edit-post/:slug"
                        element={
                            <AuthLayout authentication>
                                <EditPost />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="post/:slug"
                        element={
                            <AuthLayout authentication>
                                <Post />
                            </AuthLayout>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
