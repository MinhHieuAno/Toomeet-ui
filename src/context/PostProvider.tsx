"use client";
import { OriginPost, Post } from "@/lib/post.utils";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./AuthProvider";
import { SocketProvider, useSocket } from "./SocketProvider";

type PostProviderProps = {
    children: React.ReactNode;
    data: Post;
};

interface IPostContext {
    post: Post;
    originPost: OriginPost | null;
    setPost: Dispatch<SetStateAction<Post>>;
    showComment: boolean;
    setShowComment: Dispatch<SetStateAction<boolean>>;
}

const PostContext = React.createContext<IPostContext | null>(null);

const PostProvider: React.FC<PostProviderProps> = ({ children, data }) => {
    const [post, setPost] = useState<Post>(data);
    const [originPost, setOriginPost] = useState<OriginPost | null>(
        data.originPost || null
    );

    const { getConnection } = useSocket();

    useEffect(() => {
        const client = getConnection();
        if (!client || !client.connected || !post.id) return;
        const reactionSubscription = client.subscribe(
            `/post/reaction-count/${post.id}`,
            (message) => {
                const data = JSON.parse(message.body);
                console.log({ data });
                setPost((post) => ({
                    ...post,
                    reactionCount: data.reactionCount,
                }));
            }
        );

        const commentSubscription = client.subscribe(
            `/post/comment-count/${post.id}`,
            (message) => {
                const data = JSON.parse(message.body);
                setPost((post) => ({
                    ...post,
                    commentCount: data.commentCount,
                }));
            }
        );

        return () => {
            reactionSubscription.unsubscribe();
            commentSubscription.unsubscribe();
        };
    }, [post.id]);

    const [showComment, setShowComment] = useState<boolean>(false);
    const values = { post, showComment, originPost, setPost, setShowComment };

    useEffect(() => {}, []);

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
