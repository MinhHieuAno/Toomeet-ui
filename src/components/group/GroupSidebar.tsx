"use client";
import Link from "next/link";
import React, { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Atom, Compass, LucideIcon, Newspaper, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import GroupList from "./GroupList";
import Sidebar from "../sidebar/Sidebar";
import SidebarBlock from "../sidebar/SidebarBlock";
import { ScrollArea } from "../ui/scroll-area";
import GroupHeader from "./GroupHeader";
import { usePathname } from "next/navigation";

type Props = {
    className?: string;
};

const GroupSidebar = ({ className }: Props) => {
    return (
        <Sidebar className={cn(className)}>
            <SidebarBlock fullScreen>
                <GroupHeader></GroupHeader>
                <ScrollArea className="h-[650px]">
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
                </ScrollArea>
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
                "w-full justify-start px-5 py-6 rounded-none gap-2 text-base",
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
