"use client";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { usePost } from "@/context/PostProvider";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { MessageCircle } from "lucide-react";
import PostActionItem from "../PostActionItem";
import CommentList from "./CommentList";

type Props = {};

const PostComment = () => {
    const { post } = usePost();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <PostActionItem>
                    <span>
                        <MessageCircle className="w-5 h-5" />
                    </span>
                    <span>Bình luận</span>
                </PostActionItem>
            </DialogTrigger>
            <DialogContent className="2xl:min-w-[60svw] xl:min-w-[80svw] md:min-w-[60svw] min-w-[90svw] min-h-[60svh]">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-xl">
                        Bình luận bài viết {post.author.name}
                    </DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Comment Id dignissimos, exercitationem atque aspernatur,
                        est quidem recusandae rem culpa maxime ullam ducimus!
                        Quo
                    </DialogDescription>
                </DialogHeader>
                <CommentList></CommentList>
            </DialogContent>
        </Dialog>
    );
};

export default PostComment;
