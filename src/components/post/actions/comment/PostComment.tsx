"use client";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { usePost } from "@/context/PostProvider";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronLeft, MessageCircle } from "lucide-react";
import PostActionItem from "../PostActionItem";
import CommentList from "./CommentList";
import ButtonBack from "@/components/button/ButtonBack";

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
