export type NotifyType = {
    sender: {
        id: number;
        avatar: string | null;
        name: string;
    };
    tag: NotifyTag;
    content: string;
    timestamp: string;
};

export enum NotifyTag {
    "GROUP" = "GROUP",
    "COMMENT" = "COMMENT",
    "SYSTEM" = "SYSTEM",
    "FRIEND" = "FRIEND",
    "POST" = "POST",
}
