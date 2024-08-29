import React from "react";
import { PostType } from "../types/interfaces";
import { useParams } from "react-router-dom";

export const PostPage: React.FC<PostType | null> = ({post}) => {
    const { id } = useParams<{ id: string }>();
    return (

        <>
        
        {JSON.stringify(post)}
        </>
    );
}