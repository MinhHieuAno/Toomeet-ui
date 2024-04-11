"use client";
import { usePost } from "@/context/PostProvider";
import { MessageCircle } from "lucide-react";
import PostActionItem from "../PostActionItem";

type Props = {};

const PostComment = () => {
    const { setShowComment } = usePost();
    return (
        <PostActionItem onClick={() => setShowComment((show) => !show)}>
            <span className="md:block hidden">
                <MessageCircle className="w-5 h-5" />
            </span>
            <span>Bình luận</span>
        </PostActionItem>
    );
};

export default PostComment;
