"use client";
import { Post } from "@/lib/post.utils";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

type PostProviderProps = {
    children: React.ReactNode;
    data: Post;
};

interface IPostContext {
    post: Post;
    setPost: Dispatch<SetStateAction<Post>>;
    showComment: boolean;
    setShowComment: Dispatch<SetStateAction<boolean>>;
}

const PostContext = React.createContext<IPostContext | null>(null);

const PostProvider: React.FC<PostProviderProps> = ({ children, data }) => {
    const [post, setPost] = useState<Post>(data);
    const [showComment, setShowComment] = useState<boolean>(false);
    const values = { post, showComment, setPost, setShowComment };

    return (
        <PostContext.Provider value={values}>{children}</PostContext.Provider>
    );
};

const usePost = () => {
    const context = useContext(PostContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("usePost must be used within PostProvider");
    }
    return context;
};

export { PostProvider, usePost };
