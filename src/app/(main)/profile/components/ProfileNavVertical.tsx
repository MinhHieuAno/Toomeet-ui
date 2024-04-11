"use client";
import { usePathname } from "next/navigation";
import ProfileNavVerticalItem from "./ProfileNavVerticalItem";

type Props = {};

const links: {
    label: string;
    to: string;
}[] = [
    { label: "Tổng quan", to: "/profile/1/about" },
    {
        label: "Công việc và học vấn",
        to: "/profile/1/about/work_and_education",
    },
    {
        label: "Thông tin liên hệ và cơ bản",
        to: "/profile/1/about/contact_and_basic_info",
    },
    { label: "Chi tiết về bạn", to: "/profile/1/about/details" },
];

const ProfileNavVertical = ({}: Props) => {
    const pathName = usePathname();
    return (
        <div className="h-full flex flex-col justa items-center p-2">
            {links.map((link) => (
                <ProfileNavVerticalItem
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    isAvtive={pathName === link.to}
                ></ProfileNavVerticalItem>
            ))}
        </div>
    );
};

export default ProfileNavVertical;
