"use client";
import { usePathname } from "next/navigation";
import ProfileNavHorizontalItem from "./ProfileNavHorizontalItem";

type Props = {};

const links: {
    label: string;
    to: string;
}[] = [
    { label: "Bài viết", to: "/profile/1" },
    { label: "Giới thiệu", to: "/profile/1/about" },
    { label: "Bạn bè", to: "/profile/1/friends" },
];

const ProfileNavHorizontal = ({}: Props) => {
    const pathName = usePathname();
    return (
        <div className="mt-24 md:mt-28 xl:mt-36 mb-2 w-full flex justify-start gap-2 items-center p-2 border-b border-t font-semibold">
            {links.map((link) => (
                <ProfileNavHorizontalItem
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    isActive={pathName === link.to}
                />
            ))}
        </div>
    );
};

export default ProfileNavHorizontal;
