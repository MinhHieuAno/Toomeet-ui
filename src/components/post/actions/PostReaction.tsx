"use client";
import { Button } from "@/components/ui/button";
import { Reaction } from "@/components/ui/reaction";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import React from "react";
import PostActionItem from "./PostActionItem";
import { ReactionType } from "@/lib/reaction.utils";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { json } from "stream/consumers";
import { usePost } from "@/context/PostProvider";

type Props = {
    postId: string;
    initReaction: ReactionType;
};

const PostReaction = ({ postId, initReaction }: Props) => {
    const { setPost } = usePost();
    const { account } = useAuth();
    const { toast } = useToast();

    const handleReaction = async (emoji: number) => {
        if (account === null || !account.user) return;

        try {
            const { data } = await api(`/posts/${postId}/reaction`, {
                method: "PUT",
                data: {
                    emoji,
                },
            });
            setPost((post) => ({
                ...post,
                reactionCount: data.reactionCount,
                emoji: emoji,
            }));
        } catch (e: any) {
            toast({
                title: "Lỗi : ",
                description: JSON.stringify(e),
            });
        }
    };

    const handleRemoveReaction = async () => {
        if (account === null || !account.user) return;

        try {
            const { data } = await api.delete(`/posts/${postId}/reaction`);
            setPost((post) => ({
                ...post,
                reactionCount: data.reactionCount,
                emoji: -1,
            }));
        } catch (e: any) {
            toast({
                title: "Lỗi : ",
                description: JSON.stringify(e),
            });
        }
    };

    return (
        <Reaction
            initialReaction={initReaction}
            onActiveReaction={handleReaction}
            onDeactiveReaction={handleRemoveReaction}
        >
            {(activeReaction, onToggleReaction) => (
                <PostActionItem
                    onClick={onToggleReaction}
                    className={cn("", {
                        [`reaction-active-label reaction-active-label--${activeReaction?.name}`]:
                            activeReaction?.name,
                    })}
                >
                    <div className="hidden md:block w-5 h-5">
                        {activeReaction?.image ? (
                            <img
                                className="object-cover w-full h-full pointer-events-none"
                                src={`/reactions/${activeReaction?.image}`}
                                alt=""
                            />
                        ) : (
                            <ThumbsUp className="w-5 h-5" />
                        )}
                    </div>

                    <p>{activeReaction?.label || "Thích"}</p>
                </PostActionItem>
            )}
        </Reaction>
    );
};

export default PostReaction;
