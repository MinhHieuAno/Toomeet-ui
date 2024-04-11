import { MessageIcon as MessageIconType } from "@/lib/chat.utils";
import { Heart, Laugh, ThumbsUp } from "lucide-react";
import React from "react";

type Props = {};

const MessageIcon = ({
    icon,
    color,
}: {
    icon: MessageIconType;
    color?: string;
}) => {
    switch (icon) {
        case MessageIconType.LIKE:
            return <ThumbsUp size={50} style={{ color: color }} />;
        case MessageIconType.HAHA:
            return <Laugh size={50} style={{ color: color }} />;
        case MessageIconType.LOVE:
            return <Heart size={50} style={{ color: color }} />;
        default:
            return <ThumbsUp size={50} style={{ color: color }} />;
    }
};

export default MessageIcon;
