import React from "react"
import { PostType } from "../types/interfaces";
import { useNavigate } from "react-router-dom";

export const Post: React.FC<{ post: PostType }> = ({ post }) => {
    const navigate = useNavigate()

    const onPostClick = () => {
        navigate(`/posts/${post.id}`)
    }

    return (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 onClick={onPostClick} className="text-xl font-semibold mb-2 cursor-pointer">{post.title}</h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <small className="text-gray-500">
                Published: {post.published ? 'Yes' : 'No'}
            </small>
        </div>
    );
}