import { Heart, Laugh, ThumbsUp } from "lucide-react";
import { ReactionType, ReactionTypeText } from "./reaction.utils";

export type RoomType = {
    id: number;
    name: string;
    avatar: string;
    type: "GROUP" | "SINGLE";
    updatedAt: string;
};

export type MessageType = {
    id: number;
    senderId: number;
    senderName: string | null;
    roomId: number;
    icon: MessageIcon | null;
    text: string | null;
    image: string | null;
    reply: MessageReplyType;
    reactions: MessageReactionType[];
    reaction: ReactionTypeText;
    recall: boolean;
    timestamp: string;
    status: MessageStatusType;
};

type MessageReplyType = {
    id: number;
    icon: MessageIcon;
    text: string;
    timestamp: string;
    senderId: number;
    image: string;
};
type MessageStatusType = {};
export type MessageReactionType = {
    timestamp: string;
    memberId: number;
    type: ReactionTypeText;
};

export type ChatMemberType = {
    id: number;
    avatar: string;
    name: string;
};

export type RoomSetting = {
    color: string;
    icon: MessageIcon;
};

export enum MessageIcon {
    LIKE = "LIKE",
    LOVE = "LOVE",
    HAHA = "HAHA",
}

export const getMemberInfo = (
    memberId: number,
    members: ChatMemberType[]
): ChatMemberType | undefined => {
    return (
        members.find((member) => member.id === memberId) || {
            avatar: "",
            id: 10000000,
            name: "người dùng ẩn danh",
        }
    );
};

export const urlRegex = /https?:\/\/[^\s]+/g;
