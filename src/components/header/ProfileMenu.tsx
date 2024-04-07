"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { useViewport } from "@/context/ViewportProvider";
import { getUsername } from "@/lib/utils";

import {
    Bell,
    CalendarDays,
    HelpCircle,
    LogOut,
    LucideIcon,
    MessageSquareWarning,
    Moon,
    Settings,
    Sun,
    SunMoon,
    User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const ProfileMenu = () => {
    const { setTheme } = useTheme();
    const router = useRouter();
    const { account, logout } = useAuth();
    const { viewport } = useViewport();

    if (!account) return <></>;

    const handleSignOut = () => {
        logout();
        router.replace("/auth/login");
    };

    if (viewport === "mobile")
        return (
            <Link href="/settings">
                <Avatar>
                    <AvatarImage
                        loading={"lazy"}
                        src={account?.user?.profile?.avatar?.url || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {getUsername(account.user.name)[0]}
                    </AvatarFallback>
                </Avatar>
            </Link>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        loading={"lazy"}
                        src={account?.user?.profile?.avatar?.url || undefined}
                    ></AvatarImage>
                    <AvatarFallback>
                        {getUsername(account.user.name)[0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent translate="yes" className="min-w-72">
                <div className="flex justify-start items-start gap-3 p-3">
                    <Avatar>
                        <AvatarImage
                            src={
                                account?.user?.profile?.avatar?.url || undefined
                            }
                        ></AvatarImage>
                        <AvatarFallback>
                            {getUsername(account.user.name)[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                        <p className="font-semibold">{account?.user?.name}</p>
                        <p className="text-muted-foreground">
                            {account?.email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {/* ACCOUNT INFO */}
                    <DropdownMenuItemIcon
                        to={`/profile/${account.user.id}`}
                        Icon={User}
                    >
                        Trang cá nhân
                    </DropdownMenuItemIcon>
                    {/* GLOBAL SETTING */}
                    <DropdownMenuItemIcon
                        Icon={Settings}
                        to="/settings/general"
                    >
                        Cài đặt chung
                    </DropdownMenuItemIcon>
                    {/* NOTOFICATION */}
                    <DropdownMenuItemIcon
                        Icon={Bell}
                        to="/settings/notifications"
                    >
                        Thông báo
                    </DropdownMenuItemIcon>
                    {/* TIMETABLE */}
                    {/* <DropdownMenuItemIcon Icon={CalendarDays}>
                        Thời khóa biểu
                    </DropdownMenuItemIcon> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {/* LANGUAGE */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {/* <DropdownMenuItemIcon asChild Icon={Languages}> */}
                            Ngôn ngữ
                            {/* </DropdownMenuItemIcon> */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItemIcon>
                                    Tiếng việt
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon>
                                    English
                                </DropdownMenuItemIcon>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* THEME */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            {/* <DropdownMenuItemIcon Icon={SunMoon} asChild> */}
                            Giao diện
                            {/* </DropdownMenuItemIcon> */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("light")}
                                    Icon={Sun}
                                >
                                    Sáng
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("dark")}
                                    Icon={Moon}
                                >
                                    Tối
                                </DropdownMenuItemIcon>
                                <DropdownMenuItemIcon
                                    onClick={() => setTheme("system")}
                                    Icon={SunMoon}
                                >
                                    Hệ thống
                                </DropdownMenuItemIcon>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* LOGOUT */}
                    <DropdownMenuItemIcon onClick={handleSignOut} Icon={LogOut}>
                        Đăng xuất
                    </DropdownMenuItemIcon>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* HELP */}
                    <DropdownMenuItemIcon Icon={HelpCircle}>
                        Trợ giúp
                    </DropdownMenuItemIcon>
                    {/* FEEDBACK */}
                    <DropdownMenuItemIcon Icon={MessageSquareWarning}>
                        Phản hồi
                    </DropdownMenuItemIcon>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const DropdownMenuItemIcon = ({
    Icon,
    children,
    asChild,
    onClick,
    to,
}: {
    Icon?: LucideIcon;
    children: ReactNode;
    asChild?: boolean;
    onClick?: () => void;
    to?: string;
}) => {
    const router = useRouter();

    const handleClick = () => {
        if (to) router.push(to);
        else onClick?.();
    };
    return (
        <DropdownMenuItem onClick={handleClick} asChild={asChild}>
            <div className="w-full flex justify-start items-center gap-3">
                {Icon && <Icon size={20} />}
                <span>{children}</span>
            </div>
        </DropdownMenuItem>
    );
};

export default ProfileMenu;
