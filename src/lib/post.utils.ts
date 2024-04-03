import { Globe2, LockKeyhole, LucideIcon, User } from "lucide-react";
import { ReactNode } from "react";

export enum PostReaction {
    LIKE = 1,
    HAHA,
    SAD,
    LOVE,
    ANGRY,
}

export type Post = {
    id: string;
    author: {
        name: string;
        id: number;
        avatar: string;
    };
    content: string | null;
    images: string[] | null;
    reactionCount: number;
    commentCount: number;
    privacy: number;
    emoji: number;
    createdAt: Date;
    updatedAt: Date;
};

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

// export const commentsMock: CommentType[] = [
//     {
//         id: "1",
//         content: "This is a great article! I learned a lot.",
//         level: 0,
//         parentId: null,
//         author: {
//             id: 123,
//             avatar: "https://ik.imagekit.io/freeflo/production/24b2bc0e-6d28-4018-8a2d-fa9b34427864.png?tr=w-1920,q-75&alt=media&pr-true",
//             name: "John Doe",
//         },
//         likeCount: 10,
//         reactions: {
//             emoji: 1, // Assuming emoji: 1 represents a thumbs up reaction
//             users: [456, 789],
//         },
//         replyCount: 2,
//         createdAt: "2024-03-22T00:00:00.000Z",
//         updatedAt: null,
//     },
//     {
//         id: "2",
//         content: "Glad you found it helpful!",
//         level: 1,
//         parentId: "1",
//         author: {
//             id: 999,
//             avatar: "https://ik.imagekit.io/freeflo/production/24b2bc0e-6d28-4018-8a2d-fa9b34427864.png?tr=w-1920,q-75&alt=media&pr-true",
//             name: "Admin",
//         },
//         likeCount: 2,
//         reactions: {
//             emoji: 0, // Assuming emoji: 0 represents no reaction
//             users: [],
//         },
//         replyCount: 0,
//         createdAt: "2024-03-22T01:00:00.000Z",
//         updatedAt: null,
//     },
//     {
//         id: "3",
//         content: "Here's another perspective to consider...",
//         level: 0,
//         parentId: null,
//         author: {
//             id: 321,
//             avatar: "https://ik.imagekit.io/freeflo/production/24b2bc0e-6d28-4018-8a2d-fa9b34427864.png?tr=w-1920,q-75&alt=media&pr-true",
//             name: "Jane Smith",
//         },
//         likeCount: 5,
//         reactions: {
//             emoji: 3, // Assuming emoji: 3 represents a thinking face reaction
//             users: [123],
//         },
//         replyCount: 0,
//         createdAt: "2024-03-22T10:00:00.000Z",
//         updatedAt: null,
//     },
//     {
//         id: "4",
//         content: "Cảm ơn bạn đã chia sẻ, ý kiến của bạn rất insightful!",
//         level: 1,
//         parentId: "1",
//         author: {
//             id: 456,
//             avatar: "https://example.com/profile.jpg",
//             name: "Peter Nguyen",
//         },
//         likeCount: 1,
//         reactions: {
//             emoji: 2, // Emoji: 2 là biểu tượng trái tim
//             users: [123],
//         },
//         replyCount: 0,
//         createdAt: "2024-03-22T12:00:00.000Z",
//         updatedAt: null,
//     },
//     {
//         id: "5",
//         content: "Đồng ý với bạn, quan điểm này rất đáng để cân nhắc.",
//         level: 1,
//         parentId: "3",
//         author: {
//             id: 789,
//             avatar: "https://example.com/avatar2.png",
//             name: "Minh Tran",
//         },
//         likeCount: 0,
//         reactions: {
//             emoji: 0, // Emoji: 0 là không có phản ứng
//             users: [],
//         },
//         replyCount: 0,
//         createdAt: "2024-03-22T14:00:00.000Z",
//         updatedAt: null,
//     },
//     {
//         id: "6",
//         content: "Có ai có thể chia sẻ thêm về chủ đề này không?",
//         level: 0,
//         parentId: null,
//         author: {
//             id: 654,
//             avatar: "https://example.com/guest.png",
//             name: "Khách",
//         },
//         likeCount: 0,
//         reactions: {
//             emoji: 0, // Emoji: 0 là không có phản ứng
//             users: [],
//         },
//         replyCount: 1,
//         createdAt: "2024-03-22T16:00:00.000Z",
//         updatedAt: null,
//     },
// ];

export const postsMock: Post[] = [
    {
        id: "p1",
        author: {
            name: "John Doe",
            id: 1,
            avatar: "https://example.com/avatar1.jpg",
        },
        content: "This is my first post!  #testing",
        images: null,
        reactionCount: 10,
        commentCount: 2,
        privacy: 0, // Public post
        emoji: 1, // Like emoji
        createdAt: new Date(2024, 2, 22), // March 22nd, 2024
        updatedAt: new Date(2024, 2, 22),
    },
    {
        id: "p2",
        author: {
            name: "Jane Smith",
            id: 2,
            avatar: "https://example.com/avatar2.jpg",
        },
        content: "Beautiful day for a hike! ",
        images: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
        ],
        reactionCount: 5,
        commentCount: 0,
        privacy: 1, // Friends only
        emoji: 3, // Heart emoji
        createdAt: new Date(2024, 2, 21), // March 21st, 2024
        updatedAt: new Date(2024, 2, 21),
    },
    {
        id: "p3",
        author: {
            name: "Linh",
            id: 3,
            avatar: "https://example.com/avatar3.jpg",
        },
        content: null, // Just images
        images: [
            "https://example.com/food1.jpg",
            "https://example.com/food2.jpg",
        ],
        reactionCount: 20,
        commentCount: 1,
        privacy: 2, // Private post
        emoji: 4, // Haha emoji
        createdAt: new Date(2024, 2, 20), // March 20th, 2024
        updatedAt: new Date(2024, 2, 20),
    },
];

export enum CreatePostType {
    POST,
    SHARE,
    GROUP,
}
