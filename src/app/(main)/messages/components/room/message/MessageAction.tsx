"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useChatRoom } from "@/context/ChatRoomProvider";
import { MessageType } from "@/lib/chat.utils";
import { cn } from "@/lib/utils";
import { Copy, MessageSquareQuote, MoreHorizontal } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import MessageOptionBoard from "./MessageOptionBoard";

type MessageActionProps = {
    message: MessageType;
    className?: string;
    isOwner: boolean;
    setMessage: Dispatch<SetStateAction<MessageType>>;
};

const MessageAction: FC<MessageActionProps> = ({
    message,
    className,
    isOwner,
    setMessage,
}) => {
    const { toast } = useToast();
    const { setReply } = useChatRoom();

    const handleCopy = () => {
        toast({
            title: "Sao chép thành công",
            description: "Nội dung đã được ghi vào bộ nhớ đệm",
        });
    };

    return (
        <div
            className={cn(
                "relative text-muted-foreground bg-muted rounded-md transition-all group-hover:visible invisible flex  h-max",
                {
                    "flex-row-reverse": isOwner,
                },
                className
            )}
        >
            <Button
                onClick={() => setReply(message)}
                size="icon"
                variant="ghost"
            >
                <MessageSquareQuote className="h-4 w-4" />
            </Button>
            <CopyToClipboard onCopy={handleCopy} text={message.text || ""}>
                <Button size="icon" variant="ghost">
                    <Copy className="h-4 w-4" />
                </Button>
            </CopyToClipboard>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <MessageOptionBoard message={message}></MessageOptionBoard>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MessageAction;
