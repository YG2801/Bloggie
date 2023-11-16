import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/conf_service"
import { Button, Container } from "../components/index"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate("/")
            })
        } else navigate("/")
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-col-reverse md:mx-20 md:flex-row lg:mx-40">
                    <div className="basis-3/5">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">{post.title}</h1>
                        </div>
                        <div className="mt-3 p-4 text-justify">
                            {parse(post.body)}
                        </div>
                    </div>
                    <div className=" h-fit basis-2/5">
                        {isAuthor && (
                            <div className="mt-4 text-center">
                                <Link
                                    to={`/edit-post/${post.$id}`}
                                    className="mr-3"
                                >
                                    <Button
                                        bgColor="bg-green-500"
                                        className="w-[100px]"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    className="w-[100px]"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className=" mx-auto my-4 w-full max-w-[300px] rounded-xl border border-black "
                        />
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}
