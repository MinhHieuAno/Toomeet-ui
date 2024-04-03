"use client";
import { Reaction } from "@/components/ui/reaction";
import { useToast } from "@/components/ui/use-toast";
import { usePost } from "@/context/PostProvider";
import api from "@/lib/api";
import { CommentType } from "@/lib/post.utils";
import { ReactionType } from "@/lib/reaction.utils";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    comment: CommentType;
};

const CommentReaction = ({ comment }: Props) => {
    const { toast } = useToast();

    const handleReaction = async (value: number) => {
        try {
            const { data } = await api({
                method: "POST",
                url: `/posts/${comment.id}/commentReaction`,
                data: {
                    emoji: value,
                },
            });
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Tương tác bình luận thất bại",
                description: error,
            });
        }
    };

    const handleRemoveReaction = async () => {
        try {
            await api({
                method: "DELETE",
                url: `/posts/${comment.id}/commentReaction`,
            });
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Tương tác bình luận thất bại",
                description: error,
            });
        }
    };

    return (
        <div>
            <Reaction
                size="xs"
                position="top"
                initialReaction={
                    (comment.emoji != -1
                        ? comment.emoji
                        : undefined) as ReactionType
                }
                onActiveReaction={handleReaction}
                onDeactiveReaction={handleRemoveReaction}
            >
                {(activeReaction, onToggleReaction) => (
                    <div
                        onClick={onToggleReaction}
                        className={cn(
                            "hover:underline hover:text-primary transition-all cursor-pointer",
                            {
                                [`reaction-active-label reaction-active-label--${activeReaction?.name}`]:
                                    activeReaction?.name,
                            }
                        )}
                    >
                        <p className="">{activeReaction?.label || "Thích"}</p>
                    </div>
                )}
            </Reaction>
        </div>
    );
};

export default CommentReaction;
