import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/conf_service"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Loader } from "../index"

export default function PostForm({ post }) {
    const { register, handleSubmit, control, setValue, watch, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.body || "",
                status: post?.status || "active",
            },
        })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)

    async function submit(data) {
        setLoading(true)
        if (post) {
            try {
                const file = data.image[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null
                if (file) {
                    appwriteService.deleteFile(post.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const file = await appwriteService.uploadFile(data.image[0])
                if (file) {
                    const fileId = file.$id
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        featuredImage: fileId,
                        userId: userData.$id,
                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                })
            }
        })

        return () => subscription.unsubscribe()
    }, [[watch, slugTransform, setValue]])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex-wrap md:flex">
            <div className="px-2 md:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    readOnly
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="mt-4 px-2 md:mt-0 md:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="mb-4 w-full">
                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
                {loading && (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                )}
            </div>
        </form>
    )
}
