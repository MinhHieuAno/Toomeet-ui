"use client";
import { Button } from "@/components/ui/button";
import TextArea from "@/components/ui/text-area";
import { cn } from "@/lib/utils";
import { Heart, Laugh, SendHorizontal, ThumbsUp, X } from "lucide-react";
import InputMessageExtends from "./InputMessageExtends";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { set } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { getMemberInfo } from "@/lib/chat.utils";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";

type Props = {
    className?: string;
};

let a = 1;
const InputMessage = ({ className }: Props) => {
    const [pending, setPending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { setting, room, loading, reply, members, setReply } = useChatRoom();
    const { toast } = useToast();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const resizeEvent = () => {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        };
        window.addEventListener("resize", resizeEvent);
        return () => window.removeEventListener("resize", resizeEvent);
    }, []);

    const handleSendMessage = async () => {
        if (message.trim().length === 0) return;
        setPending(true);
        try {
            const { data } = await api({
                method: "POST",
                url: "/chats/messages",
                data: {
                    text: message,
                },
                params: {
                    r: room?.id,
                    reply: reply?.id,
                },
            });
            // a = a + 1;
            setMessage("");
            setReply(null);
            if (inputRef.current) inputRef.current.focus();
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Gửi tin nhắn thất bại: " + error,
            });
            console.log(error);
        }
        setPending(false);
    };

    const handleSendIcon = async () => {
        setPending(true);
        try {
            await api({
                method: "POST",
                url: "/chats/messages",
                data: {
                    icon: setting?.icon,
                },
                params: {
                    r: room?.id,
                },
            });
            setMessage("");
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Gửi tin nhắn thất bại: " + error,
            });
            console.log(error);
        }
        setPending(false);
    };

    return (
        <div className={cn("border-t w-full relative", className)}>
            {reply && (
                <div className=" px-5 py-3 bg-muted backdrop-blur-md bg-opacity-35 group relative rounded-tl-md rounded-tr-md ">
                    <p className="font-semibold text-sm">
                        {getMemberInfo(reply.senderId, members)?.name}
                    </p>
                    {reply.text && (
                        <p className="text-sm text-slate-400 line-clamp-2">
                            {reply.text}
                        </p>
                    )}

                    {reply.icon && (
                        <p className="text-sm text-slate-400 line-clamp-2">
                            @icon
                        </p>
                    )}

                    {reply.image && (
                        <div className="w-8 h-8 mt-2 opacity-55">
                            <img
                                className="w-full h-full rounded-[inherit] object-cover"
                                src={reply.image}
                                alt="message-reply-image"
                            />
                        </div>
                    )}
                    <Button
                        onClick={() => setReply(null)}
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 text-muted-foreground"
                    >
                        <X size={20}></X>
                    </Button>
                </div>
            )}
            <div className="relative">
                <TextArea
                    ref={inputRef}
                    disabled={pending || loading}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="max-h-[200px] flex-1 p-4  pr-28 !border-none !outline-none placeholder:text-nowrap placeholder:line-clamp-1 placeholder:max-w-[80%]"
                    placeholder={room ? `Tin nhắn tới ${room?.name}` : ""}
                ></TextArea>
                {/*  */}
                <div className="absolute bottom-3 right-3 flex justify-end items-center gap-2">
                    <InputMessageExtends></InputMessageExtends>
                    {message.trim().length === 0 ? (
                        <Button
                            onClick={handleSendIcon}
                            disabled={pending || loading}
                            className="text-white"
                            style={{ background: setting?.color }}
                        >
                            {!setting?.icon && <ThumbsUp size={20} />}
                            {setting?.icon === "LIKE" && <ThumbsUp size={20} />}
                            {setting?.icon === "HAHA" && <Laugh size={20} />}
                            {setting?.icon === "LOVE" && <Heart size={20} />}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSendMessage}
                            className="h-full"
                            style={{ background: setting?.color }}
                            disabled={
                                message.trim().length === 0 ||
                                loading ||
                                pending
                            }
                        >
                            <SendHorizontal
                                size={20}
                                className="dark:text-white"
                            />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputMessage;
