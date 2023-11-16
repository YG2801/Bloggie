import React, { useState, useEffect } from "react"
import { Container, PostForm } from "../components"
import appwriteService from "../appwrite/conf_service"
import { useNavigate, useParams } from "react-router-dom"

export default function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((res) => {
                if (res) {
                    setPost(res)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}
