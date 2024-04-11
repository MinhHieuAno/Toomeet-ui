"use client";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/context/PostProvider";
import { ReactionType } from "@/lib/reaction.utils";
import PostReaction from "./PostReaction";
import PostShare from "./PostShare";
import PostComment from "./comment/PostComment";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

type Props = {};

const PostAction = ({}: Props) => {
    const { post, setShowComment } = usePost();

    const { account } = useAuth();

    return (
        <div className="">
            <div className="w-full flex justify-between items-center font-semibold text-xs text-muted-foreground">
                <span className="">{post.reactionCount} lượt thích</span>
                <span
                    onClick={() => setShowComment(true)}
                    className="hover:underline hover:text-primary cursor-pointer"
                >
                    {post.commentCount} bình luận
                </span>
            </div>
            <Separator className="my-3"></Separator>
            <div
                className={cn(
                    "grid gap-8 w-full justify-between items-center",
                    {
                        "grid-cols-3": account?.user.id !== post.author.id,
                        "grid-cols-2": account?.user.id === post.author.id,
                    }
                )}
            >
                <PostReaction
                    postId={post.id}
                    initReaction={
                        (post.emoji != -1
                            ? post.emoji
                            : undefined) as ReactionType
                    }
                ></PostReaction>
                <PostComment></PostComment>
                {account?.user.id !== post.author.id && <PostShare></PostShare>}
            </div>
        </div>
    );
};

export default PostAction;
