"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import api from "@/lib/api";
import { MessageType } from "@/lib/chat.utils";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type MessageOptionBoardProps = {
    message: MessageType;
};
const MessageOptionBoard: FC<MessageOptionBoardProps> = ({ message }) => {
    const { toast } = useToast();
    const { setReply, room } = useChatRoom();
    const handleCopy = () => {
        toast({
            title: "Sao chép thành công",
            description: "Nội dung đã được ghi vào bộ nhớ đệm",
        });
    };

    const handleRecall = async () => {
        try {
            const { data } = await api.delete(`/chats/messages/${message.id}`, {
                params: {
                    r: room?.id,
                },
            });
            toast({
                title: "Thành công",
                description: "Tin nhắn đã được thu hồi",
            });
        } catch (error: any) {
            toast({
                title: "Thu hồi thất bại",
                description: error,
            });
            console.log(error);
        }
    };
    return (
        <div className=" max-w-48 my-2">
            <MessageOptionBoardItem onClick={() => setReply(message)}>
                Trả lời
            </MessageOptionBoardItem>
            <CopyToClipboard onCopy={handleCopy} text={message.text || ""}>
                <MessageOptionBoardItem>
                    Sao chép tin nhắn
                </MessageOptionBoardItem>
            </CopyToClipboard>
            <Separator></Separator>
            <MessageOptionBoardItem
                onClick={handleRecall}
                className="text-destructive hover:text-destructive hover:bg-destructive/5"
            >
                Thu hồi
            </MessageOptionBoardItem>
        </div>
    );
};

type MessageOptionBoardItemProps = {
    children: ReactNode;
    className?: string;
} & ButtonProps;
const MessageOptionBoardItem: FC<MessageOptionBoardItemProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Button
            variant="ghost"
            className={cn("px-5 py-4 w-full justify-start ", className)}
            {...props}
        >
            {children}
        </Button>
    );
};

export default MessageOptionBoard;
