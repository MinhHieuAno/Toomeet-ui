"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Compass, LucideIcon, Newspaper, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import GroupList from "./GroupList";
import GroupSidebarHeader from "./GroupSidebardHeader";

type Props = {
    className?: string;
};

const GroupSidebar = ({ className }: Props) => {
    return (
        <Sidebar className={cn(className)}>
            <SidebarBlock fullScreen>
                <GroupSidebarHeader></GroupSidebarHeader>
                <div>
                    <GroupSidebarItem
                        to="/groups/feed"
                        Icon={Newspaper}
                        label="Bảng tin nhóm"
                    />
                    <GroupSidebarItem
                        to="/groups/discover"
                        Icon={Compass}
                        label="Khám phá"
                    />

                    {/* <GroupSidebarItem
                            to="/groups/joins"
                            Icon={Atom}
                            label="Nhóm của bạn"
                        /> */}

                    <div className="w-full px-3 hidden md:block">
                        <Link
                            href="/groups/create"
                            className={cn(
                                buttonVariants(),
                                "my-3 w-full font-semibold"
                            )}
                        >
                            <Plus className="w-4 h-4 mx-2" />
                            Tạo nhóm{" "}
                        </Link>
                    </div>
                </div>
                <Separator></Separator>
                <GroupList></GroupList>
            </SidebarBlock>
        </Sidebar>
    );
};

type GroupSidebarItemProps = {
    to: string;
    Icon: LucideIcon;
    label: string;
};

const GroupSidebarItem: FC<GroupSidebarItemProps> = ({ label, to, Icon }) => {
    const pathName = usePathname();
    return (
        <Link
            href={to}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start px-5 py-6 rounded-none gap-2 text-sm md:text-base",
                { "bg-primary/5 text-primary": pathName.startsWith(to) }
            )}
        >
            <Button size="icon" className="rounded-full" variant="secondary">
                <Icon className="w-4 h-4"></Icon>
            </Button>
            <span>{label}</span>
        </Link>
    );
};

export default GroupSidebar;
