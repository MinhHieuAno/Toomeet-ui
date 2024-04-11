"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Separator } from "@/components/ui/separator";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { MessageType, getMemberInfo, urlRegex } from "@/lib/chat.utils";
import { cn, getUsername } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import moment from "moment";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import MessageAction from "./MessageAction";
import MessageIcon from "./MessageIcon";
import MessageOptionBoard from "./MessageOptionBoard";
import MessageReaction from "./MessageReaction";
import Image from "@/components/ui/image";
import { useSocket } from "@/context/SocketProvider";

type Props = {
    isOwner?: boolean;
    className?: string;
    data: MessageType;
    canScrollIntoView?: boolean;
};

const Message = ({
    isOwner = false,
    className,
    data,
    canScrollIntoView,
}: Props) => {
    const [message, setMessage] = useState<MessageType>(data);
    const { setting, members } = useChatRoom();
    const sender = useMemo(
        () => getMemberInfo(message.senderId, members),
        [message.senderId, members]
    );
    const { getConnection } = useSocket();

    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const client = getConnection();
        if (!client?.connected) return;

        const sub = client.subscribe(
            `/message-recall/${message.id}`,
            (message) => {
                const data = JSON.parse(message.body);
                setMessage(data);
            }
        );

        return () => sub.unsubscribe();
    }, [message.id]);

    useEffect(() => {
        if (!canScrollIntoView || !messageRef.current) return;

        messageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [messageRef]);

    const moveToReply = (replyId: number) => {
        const originMessage = document.getElementById(`message-${replyId}`);
        if (originMessage)
            originMessage.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
    };

    return (
        <div
            ref={messageRef}
            id={`message-${message.id}`}
            className={cn(
                "group relative flex justify-start gap-2 ",
                {
                    " flex-row-reverse": isOwner,
                },
                className
            )}
        >
            {!isOwner && (
                <Avatar>
                    <AvatarImage
                        loading={"lazy"}
                        src={sender?.avatar || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {getUsername(sender?.name || "")[0]}
                    </AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(" flex flex-col items-start", {
                    "items-end": isOwner,
                })}
            >
                {/* REPLY */}
                {message.reply && (
                    <div
                        onClick={() => moveToReply(message.reply.id)}
                        id={`reply-message-${message.reply.id}`}
                        className=" w-max max-w-xl flex  bg-muted -mb-2 px-5 py-4 rounded-md text-muted-foreground"
                    >
                        <Separator
                            orientation="vertical"
                            className={cn("w-[2px] bg-primary mr-2")}
                        ></Separator>
                        <div>
                            <p className="text-xs  font-semibold text-black dark:text-white">
                                {
                                    getMemberInfo(
                                        message.reply.senderId,
                                        members
                                    )?.name
                                }
                            </p>
                            {message.reply.text && (
                                <p className="text-pretty line-clamp-3 text-sm md:text-base">
                                    {message.reply.text}
                                </p>
                            )}
                            {message.reply.icon && (
                                <p className="text-pretty line-clamp-3">
                                    @icon
                                </p>
                            )}

                            {message.reply.image && (
                                <div className="w-16 h-16 mt-2 opacity-55">
                                    <img
                                        className="w-full h-full rounded-[inherit] object-cover"
                                        src={message.reply.image}
                                        alt="message-reply-image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* MAIN MESSAGE */}
                <div
                    className={cn(
                        "flex flex-col md:flex-row gap-2 items-center",
                        {
                            "md:flex-row-reverse": isOwner,
                        }
                    )}
                >
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <div
                                className={cn(
                                    "relative  px-3 py-2  w-max rounded-md max-w-[60svw] md:max-w-xl z-10",
                                    {
                                        " text-white bg-primary": isOwner,
                                        "bg-slate-200 dark:bg-slate-900":
                                            !isOwner,
                                        "!bg-transparent": message.icon,
                                    }
                                )}
                                style={{
                                    background: isOwner ? setting?.color : "",
                                }}
                            >
                                {!message.recall && message.text && (
                                    <MessageReaction
                                        isOwner={isOwner}
                                        message={message}
                                    ></MessageReaction>
                                )}
                                {/* USERNAME */}
                                {!isOwner && (
                                    <p className="text-xs text-muted-foreground font-semibold">
                                        {sender?.name}
                                    </p>
                                )}
                                <div className="my-2 md:my-3 max-w-full">
                                    {/* MESSAGE TEXT */}
                                    {message.text &&
                                        (message.text.match(urlRegex) ? (
                                            <Link
                                                className="text-pretty hover:underline text-sm md:text-base"
                                                href={
                                                    message.text.match(
                                                        urlRegex
                                                    )?.[0] || ""
                                                }
                                            >
                                                {message.text}
                                            </Link>
                                        ) : (
                                            <p
                                                className={cn(
                                                    "text-pretty text-sm md:text-base",
                                                    {
                                                        "select-none ":
                                                            message.recall,
                                                    }
                                                )}
                                            >
                                                {message.text}
                                            </p>
                                        ))}
                                    {/* ICON */}
                                    {message.icon && (
                                        <div className="rounded-full p-4">
                                            <MessageIcon
                                                color={setting?.color}
                                                icon={message.icon}
                                            ></MessageIcon>
                                        </div>
                                    )}
                                    {/* IMAGE */}
                                    {message.image && (
                                        <Image
                                            className="w-full xl:w-96  aspect-square rounded-md flex justify-center items-center "
                                            imgClassName="object-contain"
                                            src={message.image}
                                            alt={`message-image-${message.id}`}
                                        />
                                    )}
                                </div>

                                {/* TIMESTAMP */}
                                <p
                                    className={cn("text-xs mt-1", {
                                        "text-white": isOwner,
                                        "text-muted-foreground": !isOwner,
                                        "text-slate-900 !dark:text-slate-200":
                                            message.icon,
                                    })}
                                >
                                    {moment(message.timestamp).format("HH:mm")}
                                </p>
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="">
                            <MessageOptionBoard
                                message={message}
                            ></MessageOptionBoard>
                        </ContextMenuContent>
                    </ContextMenu>

                    {/* ACTIONS */}
                    <MessageAction
                        setMessage={setMessage}
                        isOwner={isOwner}
                        className=" "
                        message={message}
                    ></MessageAction>
                </div>
            </div>
        </div>
    );
};

export default Message;
