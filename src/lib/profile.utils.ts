export type ProfileOverviewType = {
    workplace: string | null;
    education: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
};

export type ProfilePublic = {
    id: number;
    name: string;
    description: string;
    background: string;
    avatar: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    dateOfBirth: string;
    education: string;
    workplace: string;
    phone: string;
    email: string;
    adress: string;
};
