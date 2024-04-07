export enum GroupPrivacy {
    PUBLIC = 1,
    PRIVATE = 0,
}

export type GroupType = {
    groupId: string;
    name: string;
    description: string;
    user: any;
    admin: number;
    avatar: string;
    // private Integer quantityMember;
    // @CreationTimestamp
    // private Date createdAt;
    // @UpdateTimestamp
    // private Date updatedAt;
};
