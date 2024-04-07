"use client";
import React, { FC, ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import SidebarBlock from "../sidebar/SidebarBlock";
import { Separator } from "../ui/separator";
import SideBarItem from "../sidebar/SideBarItem";
import {
    Bell,
    Bolt,
    ChevronLeft,
    Globe,
    HelpCircle,
    LucideIcon,
    MessageSquareWarning,
    Shield,
    User,
    X,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import ButtonBack from "../button/ButtonBack";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

const links: {
    label: string;
    to: string;
    Icon: LucideIcon;
}[] = [
    {
        label: "Trang cá nhân",
        to: `/profile/${1}`,
        Icon: User,
    },
    {
        label: "Cài đặt chung",
        to: "/settings/general",
        Icon: Bolt,
    },
    {
        label: "Tài khoản và bào mật",
        to: "/settings/account-and-security",
        Icon: Shield,
    },

    {
        label: "Thông báo",
        to: "/settings/notifications",
        Icon: Bell,
    },
    {
        label: "Ngôn ngữ",
        to: "/settings/languages",
        Icon: Globe,
    },
    {
        label: "Trợ giúp",
        to: "/help",
        Icon: HelpCircle,
    },

    {
        label: "Phản hồi",
        to: "/report",
        Icon: MessageSquareWarning,
    },
];

const SettingSidebar = ({ className }: Props) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        logout();
        router.replace("/auth/login");
    };

    return (
        <Sidebar className={cn(className)}>
            <SidebarBlock fullScreen className="p-2">
                <div className="flex justify-start items-center gap-2">
                    <ButtonBack variant="secondary" size="icon">
                        <ChevronLeft />
                    </ButtonBack>
                    <h1 className="m-3 text-xl md:text-2xl font-semibold text-muted-foreground">
                        Cài đặt
                    </h1>
                </div>
                <Separator></Separator>

                {links.map((link, index) => (
                    <SettingSidebarItem key={index} {...link} />
                ))}

                <Separator className="block md:hidden"></Separator>
                <Button
                    onClick={handleSignOut}
                    variant="secondary"
                    className="flex md:hidden w-full mt-5 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                >
                    Đăng xuất
                </Button>
            </SidebarBlock>
        </Sidebar>
    );
};

type SettingSidebarItemProps = {
    Icon: LucideIcon;
    label: string;
    to: string;
};

const SettingSidebarItem: FC<SettingSidebarItemProps> = ({
    Icon,
    label,
    to,
}) => {
    const pathName = usePathname();
    return (
        <SideBarItem
            className="px-5 py-4 gap-3"
            to={to}
            active={pathName.startsWith(to)}
        >
            <Icon size={20}></Icon>
            <p className="text-base font-semibold">{label}</p>
        </SideBarItem>
    );
};

export default SettingSidebar;
