"use client";
import { Reaction } from "@/components/ui/reaction";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { useSocket } from "@/context/SocketProvider";
import api from "@/lib/api";
import { MessageReactionType, MessageType } from "@/lib/chat.utils";
import { Reactions, convertReactionToText } from "@/lib/reaction.utils";
import { cn } from "@/lib/utils";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    message: MessageType;
    isOwner: boolean;
};

const MessageReaction = ({ message, isOwner }: Props) => {
    const [reactions, setReactions] = useState<MessageReactionType[]>(
        message.reactions
    );
    const { room } = useChatRoom();
    const { toast } = useToast();
    const { getConnection } = useSocket();

    useEffect(() => {
        const client = getConnection();
        if (!client?.connected) return;

        const sub = client.subscribe(
            `/message-reaction/${message.id}`,
            (message) => {
                const data = JSON.parse(message.body);
                const reaction: MessageReactionType = {
                    memberId: data.memberId,
                    timestamp: data.timestamp,
                    type: data.reactionType,
                };
                if (data.type === "CREATE") {
                    addReaction(reaction);
                } else if (data.type === "REMOVE") {
                    removeReaction(reaction);
                }
            }
        );

        return () => sub.unsubscribe();
    }, [message.id]);

    const handleReaction = async (value: number) => {
        try {
            const { data } = await api({
                method: "POST",
                url: `chats/${room?.id}/${message.id}/reaction`,
                data: {
                    type: convertReactionToText(value),
                },
            });
            addReaction(data);
        } catch (error: any) {
            toast({
                title: "Tương tác thất bại",
                description: error,
            });
        }
    };

    const handleRemoveReaction = async () => {
        try {
            const { data } = await api({
                method: "DELETE",
                url: `chats/${room?.id}/${message.id}/reaction`,
            });
            removeReaction(data);
        } catch (error: any) {
            toast({
                title: "Hủy tương tác thất bại",
                description: error,
            });
        }
    };

    const addReaction = (data: MessageReactionType) => {
        setReactions((reactions) => [
            ...reactions.filter(
                (reaction) => reaction.memberId !== data.memberId
            ),
            data,
        ]);
    };

    const removeReaction = (data: MessageReactionType) => {
        setReactions((reactions) =>
            reactions.filter((reaction) => reaction.memberId !== data.memberId)
        );
    };

    return (
        <div
            className={cn("absolute top-[90%] flex items-center", {
                "right-3": !isOwner,
            })}
        >
            {reactions?.length > 0 && (
                <div className="mx-1 flex items-center">
                    {reactions?.slice(0, 5).map((reaction, index) => (
                        <div
                            key={index}
                            className={cn("", {
                                [`reaction-active-label reaction-active-label--${reaction.type}`]:
                                    reaction.type,
                            })}
                        >
                            <div className="flex w-5 h-5  justify-center items-center">
                                <img
                                    className="object-cover w-full h-full pointer-events-none"
                                    src={`/reactions/${reaction.type.toLowerCase()}.png`}
                                    alt="reaction-icon"
                                />
                            </div>
                        </div>
                    ))}
                    {reactions.length > 5 && (
                        <div className="w-5 h-5 rounded-full text-xs font-semibold">
                            +{reactions.length}
                        </div>
                    )}
                </div>
            )}

            {!isOwner && (
                <div className="bg-white dark:bg-slate-800 p-1 rounded-full ">
                    <Reaction
                        size="xs"
                        position="top"
                        showRemove
                        initialReaction={Reactions[message.reaction]}
                        onActiveReaction={handleReaction}
                        onDeactiveReaction={handleRemoveReaction}
                    >
                        {(activeReaction, onToggleReaction) => (
                            <div
                                onClick={onToggleReaction}
                                className={cn(
                                    "",
                                    {
                                        [`reaction-active-label reaction-active-label--${activeReaction?.name}`]:
                                            activeReaction?.name,
                                    },
                                    "flex gap-2 items-center"
                                )}
                            >
                                <div className="flex w-5 h-5  justify-center items-center">
                                    {activeReaction?.image ? (
                                        <img
                                            className="object-cover w-full h-full pointer-events-none"
                                            src={`/reactions/${activeReaction?.image}`}
                                            alt="reaction-icon"
                                        />
                                    ) : (
                                        <ThumbsUp className="w-4 h-4" />
                                    )}
                                </div>
                            </div>
                        )}
                    </Reaction>
                </div>
            )}
        </div>
    );
};

export default MessageReaction;
