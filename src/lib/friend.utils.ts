export type Friend = {
    id: number;
    name: string;
    profile: {
        description: string | null;
        avatar: {
            url: string;
            format: string;
        } | null;
    };
};

export const mockFriends: Friend[] = [
    {
        id: 1,
        name: "Alice",
        profile: {
            description: "Enjoys nature walks and playing the piano.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Replace with actual image URL
                format: "jpeg",
            },
        },
    },
    {
        id: 2,
        name: "Bob",
        profile: {
            description: "Tech enthusiast and a passionate writer.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Replace with actual image URL
                format: "png",
            },
        },
    },
    // Add 8 more friends:
    {
        id: 3,
        name: "Charlie",
        profile: {
            description: "Loves cooking and exploring new cuisines.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 4,
        name: "Diana",
        profile: {
            description: "An avid reader and enjoys traveling.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 5,
        name: "Evan",
        profile: {
            description: "Works in music and loves playing the guitar.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 6,
        name: "Fiona",
        profile: {
            description: "A software developer with a passion for coding.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 7,
        name: "Gabriel",
        profile: {
            description: "Enjoys photography and capturing beautiful moments.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 8,
        name: "Hannah",
        profile: {
            description: "Loves fitness and enjoys outdoor activities.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 9,
        name: "Isaac",
        profile: {
            description: "A passionate artist with a creative mind.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
    {
        id: 10,
        name: "Jasmine",
        profile: {
            description:
                "Enjoys learning new languages and exploring cultures.",
            avatar: {
                url: "https://ik.imagekit.io/freeflo/production/a268e8b4-49e0-4fdb-8815-47f15475d5e1.png?tr=w-1920,q-75&alt=media&pr-true", // Placeholder image
                format: "jpg",
            },
        },
    },
];
