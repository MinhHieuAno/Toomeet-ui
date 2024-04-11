export enum GroupPrivacy {
    PUBLIC = 1,
    PRIVATE = 0,
}

export type Group = {
    groupId: string;
    name: string;
    avatar: string;
    quantityMember: number;
    description: string;
    admin: {
        id: number;
        name: string;
        avatar: string;
    };
    createdAt: string;
    updatedAt: string;
    member: boolean;
};
