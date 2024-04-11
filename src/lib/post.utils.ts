import exp from "constants";
import { Globe2, LockKeyhole, LucideIcon, User } from "lucide-react";
import { type } from "os";
import { ReactNode } from "react";

export enum PostReaction {
    LIKE = 1,
    HAHA,
    SAD,
    LOVE,
    ANGRY,
}

export type OriginPost = {
    content: string | null;
    id: number;
    author: {
        name: string;
        id: number;
        avatar: string;
    };
    images: string[] | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Post = {
    id: string;
    author: {
        name: string;
        id: number;
        avatar: string;
    };
    originPost?: OriginPost | null;
    content: string | null;
    images: string[] | null;
    reactionCount: number;
    commentCount: number;
    privacy: number;
    emoji: number;
    createdAt: Date;
    updatedAt: Date;
};

export enum PostGroupStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DELETED = "deleted",
}

export type PostGroup = {
    postId: string;
    status: PostGroupStatus;
} & Post;

export enum PostPrivacy {
    PUBLIC = 0,
    PRIVATE = 1,
    FRIEND = 2,
    GROUP = 3,
}

type PricacyData = { label: string; Icon: LucideIcon };
export const getPrivacyData = (
    privacy: number,
    content: (privacyData: PricacyData) => ReactNode
): ReactNode => {
    let privacyData: PricacyData;
    switch (privacy) {
        case PostPrivacy.PUBLIC:
            privacyData = { label: "Công khai", Icon: Globe2 };
            break;
        case PostPrivacy.PRIVATE:
            privacyData = { label: "Riêng tư", Icon: LockKeyhole };
            break;
        case PostPrivacy.FRIEND:
            privacyData = { label: "Bạn bè", Icon: User };
            break;
        default:
            privacyData = { label: "Công khaissssssssss", Icon: Globe2 };
    }
    return content(privacyData);
};

export type CommentType = {
    id: string;
    content: string;
    level: number;
    parentId: string | null;
    author: {
        id: number;
        avatar: string;
        name: string;
    };
    likeCount: number;
    emoji: number;
    reactions: {
        users: number[];
    } | null;
    replyCount: number;
    createdAt: string;
    updatedAt: string | null;
};

export enum CreatePostType {
    POST,
    SHARE,
    GROUP,
}
