"use client";
import Navbar from "@/components/header/Navbar";
import SideBarItem from "@/components/sidebar/SideBarItem";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { useSocket } from "@/context/SocketProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const links: { link: string; name: string }[] = [
    {
        link: "/friends/suggestions",
        name: "Gợi ý",
    },
    {
        link: "/friends",
        name: "Tất cả bạn bè",
    },
    {
        link: "/friends/requests",
        name: "Lời mời kết bạn",
    },
];

const layout = ({ children }: Props) => {
    const pathname = usePathname();

    return (
        <MaxWidthWrapper className="grid md:grid-cols-12 gap-2">
            <Sidebar className="col-start-1 col-end-4 hidden md:block">
                <SidebarBlock fullScreen className="" title="Bạn bè">
                    {links.map(({ link, name }, index) => (
                        <SideBarItem
                            key={index}
                            active={pathname === link}
                            className="font-semibold"
                            to={link}
                        >
                            {name}
                        </SideBarItem>
                    ))}
                </SidebarBlock>
            </Sidebar>
            <div className="sticky left-0 w-full max-w-[100svw] overflow-auto top-[72px] z-40  flex md:hidden justify-start items-center gap-2 bg-white dark:bg-slate-900 px-3 py-4">
                {links.map(({ link, name }, index) => (
                    <Link
                        className={cn(
                            "text-sm",
                            buttonVariants({
                                variant:
                                    pathname === link ? "default" : "secondary",
                            })
                        )}
                        href={link}
                        key={index}
                    >
                        {name}
                    </Link>
                ))}
            </div>
            <div className="md:col-start-4 md:col-end-13 md:mt-8 ">
                {children}
            </div>
            <Navbar className="fixed md:hidden -bottom-[8px] p-3 pb-5 w-svw left-[50%] -translate-x-[50%] dark:bg-slate-900 z-50 bg-white da col-start-4 col-end-10 mx-0 2xl:mx-16 shadow-xl border-t"></Navbar>
        </MaxWidthWrapper>
    );
};

export default layout;
