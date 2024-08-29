import React, { useEffect } from "react";
import { useGetPostsMutation } from "../redux/slice/apiSlice";
import { Post } from "./Post";

export const Posts: React.FC = () => {
    const [getPosts, { isLoading, isError, data }] = useGetPostsMutation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await getPosts().unwrap();
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [getPosts]); // Dependency array includes getPosts

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Error loading posts</div>;


    // Check if data is defined before accessing it
    return (
        <div className="max-w-2xl mx-auto p-4">
            {data && data.length > 0 ? (
                data.map((post) => (
                    <Post key={post.id} post={post} />
                ))
            ) : (
                <div className="text-center text-gray-500">No posts available</div>
            )}
        </div>
    );
};
