"use client";
import { NotifyTag, NotifyType } from "@/lib/notify.utils";
import { cn, getUsername } from "@/lib/utils";
import {
    Bolt,
    Ghost,
    MessageCircle,
    UserRound,
    UsersRound,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
    className?: string;
} & NotifyType;

const tags = {
    [NotifyTag.COMMENT]: {
        icon: <MessageCircle size={16} />,
        color: "#22c55e",
    },
    [NotifyTag.FRIEND]: { icon: <UserRound size={16} />, color: "#1d4ed8" },
    [NotifyTag.GROUP]: { icon: <UsersRound size={16} />, color: "#4338ca" },
    [NotifyTag.SYSTEM]: { icon: <Bolt size={16} />, color: "#5b21b6" },
    [NotifyTag.POST]: { icon: <Ghost size={16} />, color: "#22c55e" },
};

const NotifyItem = ({ className, content, sender, tag, timestamp }: Props) => {
    const router = useRouter();

    const handleClick = () => {
        switch (tag) {
            case NotifyTag.FRIEND:
                router.push(`/friends/requests`);
            case NotifyTag.COMMENT:
                break;
            case NotifyTag.GROUP:
                break;
            case NotifyTag.SYSTEM:
                break;
            default:
                break;
        }
    };

    return (
        <DropdownMenuItem
            onClick={handleClick}
            className={cn(
                "px-5 py-2 flex justify-start items-start gap-5 cursor-pointer",
                className
            )}
        >
            <div className="relative">
                <Avatar className=" w-14 h-14">
                    <AvatarImage src={sender.avatar || undefined}></AvatarImage>
                    <AvatarFallback>
                        {getUsername(sender.name)[0]}
                    </AvatarFallback>
                </Avatar>
                <div
                    style={{ background: tags[tag]?.color }}
                    className={cn(
                        `absolute -bottom-2 -right-2 text-white w-8 h-8 shadow-xl rounded-full flex justify-center items-center`
                    )}
                >
                    {tags[tag]?.icon}
                </div>
            </div>
            <div>
                <div className="space-x-1">
                    <span className="font-medium text-primary">
                        {sender.name}
                    </span>
                    <span className="line-clamp-2">{content}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {moment(timestamp).fromNow()}
                </span>
            </div>
        </DropdownMenuItem>
    );
};

export default NotifyItem;
