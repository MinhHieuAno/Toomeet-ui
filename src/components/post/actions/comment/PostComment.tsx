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
    const { post } = usePost();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <PostActionItem>
                    <span className="md:block hidden">
                        <MessageCircle className="w-5 h-5" />
                    </span>
                    <span>Bình luận</span>
                </PostActionItem>
            </DialogTrigger>
            <DialogContent className="2xl:min-w-[60svw] xl:min-w-[80svw] md:min-w-[60svw] min-w-[90svw] min-h-[60svh]">
                <DialogHeader>
                    <div className="flex justify-start items-center gap-2">
                        <DialogClose>
                            <ChevronLeft />
                        </DialogClose>
                        <DialogTitle className="font-semibold text-xl">
                            Bình luận bài viết {post.author.name}
                        </DialogTitle>
                    </div>
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
