"use client";
import { Reaction } from "@/components/ui/reaction";
import { useToast } from "@/components/ui/use-toast";
import { CommentType } from "@/lib/post.utils";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    comment: CommentType;
};

const CommentReaction = (props: Props) => {
    const { toast } = useToast();

    const handleReaction = async () => {};

    const handleRemoveReaction = async () => {};

    return (
        <div>
            <Reaction
                size="xs"
                position="top"
                initialReaction={undefined}
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
                        <p>{activeReaction?.label || "Thích"}</p>
                    </div>
                )}
            </Reaction>
        </div>
    );
};

export default CommentReaction;
