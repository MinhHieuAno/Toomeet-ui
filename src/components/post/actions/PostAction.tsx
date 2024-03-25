"use client";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/context/PostProvider";
import { ReactionType } from "@/lib/reaction.utils";
import PostReaction from "./PostReaction";
import PostShare from "./PostShare";
import PostComment from "./comment/PostComment";

type Props = {};

const PostAction = ({}: Props) => {
    const { post } = usePost();

    return (
        <div className="">
            <div className="w-full flex justify-between items-center font-semibold text-xs text-muted-foreground">
                <span className="">{post.reactionCount} lượt thích</span>
                <span className="hover:underline hover:text-primary cursor-pointer">
                    {post.commentCount} bình luận
                </span>
            </div>
            <Separator className="my-3"></Separator>
            <div className="grid grid-cols-3 gap-8 w-full justify-between items-center">
                <PostReaction
                    postId={post.id}
                    initReaction={
                        (post.emoji != -1
                            ? post.emoji
                            : undefined) as ReactionType
                    }
                ></PostReaction>
                <PostComment></PostComment>
                <PostShare></PostShare>
            </div>
        </div>
    );
};

export default PostAction;
