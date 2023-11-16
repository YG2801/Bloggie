import service from "../appwrite/conf_service"
import { Link } from "react-router-dom"

export default function PostCard({
    $id,
    title,
    featuredImage,
    status,
    statusToBeShown = false,
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className=" flex h-full w-full flex-col justify-between gap-2 rounded-xl bg-gray-800 p-4 text-gray-100 transition hover:scale-105">
                <div className="flex h-5/6 w-full justify-center ">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full rounded-xl"
                    />
                </div>
                <div className="flex h-1/6 items-center justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {statusToBeShown && (
                        <p
                            className={`px-3 py-1 ${
                                status === "active"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                            } h-fit rounded text-gray-50`}
                        >
                            {status === "active" ? "Published" : "Draft"}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}
