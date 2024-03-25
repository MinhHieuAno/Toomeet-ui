export enum Reactions {
    LIKE = 0,
    LOVE = 1,
    HAHA = 2,
    WOW = 3,
    SAD = 4,
    ANGRY = 5,
}

export type ReacttionItemType = {
    label: string;
    name: string;
    image: string;
    value: number;
};
export type ReactionType = 0 | 1 | 2 | 3 | 4 | 5 | undefined;

export type ReactionTypeText =
    | "LIKE"
    | "LOVE"
    | "HAHA"
    | "WOW"
    | "SAD"
    | "ANGRY";

export const reactions: ReacttionItemType[] = [
    {
        label: "Thích",
        name: "LIKE",
        image: "/like.png",
        value: Reactions.LIKE,
    },
    {
        label: "Yêu thích",
        name: "LOVE",
        image: "/love.png",
        value: Reactions.LOVE,
    },
    {
        label: "Haha",
        name: "HAHA",
        image: "/haha.png",
        value: Reactions.HAHA,
    },
    {
        label: "Wow",
        name: "WOW",
        image: "/wow.png",
        value: Reactions.WOW,
    },
    {
        label: "Buồn",
        name: "SAD",
        image: "/sad.png",
        value: Reactions.SAD,
    },
    {
        label: "Phẫn nộ",
        name: "ANGRY",
        image: "/angry.png",
        value: Reactions.ANGRY,
    },
];

export const reactionTexts = ["LIKE", "LOVE", "HAHA", "WOW", "SAD", "ANGRY"];

export const convertReactionToText = (value: number) => {
    return reactionTexts[value];
};
