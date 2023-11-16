import React, { useState, useEffect } from "react"
import appwriteService from "../appwrite/conf_service"
import { Container, PostCard, Loader } from "../components"
import { Query } from "appwrite"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)
    useEffect(() => {
        appwriteService
            .getPosts([Query.equal("userId", userData.$id)])
            .then((res) => {
                if (res) {
                    setPosts(res.documents)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        )
    } else if (posts.length === 0) {
        return (
            <div className="mt-4 w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <h1 className="text-2xl font-bold">
                                You have not created any post!{" "}
                                <Link
                                    to="../add-post"
                                    className="text-blue-600 underline underline-offset-2"
                                >
                                    Create
                                </Link>{" "}
                                one
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-around">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-3 w-[400px] h-[400px]">
                            <PostCard {...post} statusToBeShown />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
