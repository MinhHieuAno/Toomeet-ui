"use client";
import Header from "@/components/header/Header";
import SideBarItem from "@/components/sidebar/SideBarItem";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Toaster } from "@/components/ui/toaster";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { SocketProvider, useSocket } from "@/context/SocketProvider";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const links: { link: string; name: string }[] = [
    {
        link: "/friends",
        name: "Tất cả bạn bè",
    },
    {
        link: "/friends/requests",
        name: "Lời mời kết bạn",
    },
    {
        link: "/friends/suggestions",
        name: "Gợi ý",
    },
];

const layout = ({ children }: Props) => {
    const pathname = usePathname();

    const { connect, disconnect } = useSocket();

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

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
            <div className="md:col-start-4 md:col-end-13 mt-8 ">{children}</div>
        </MaxWidthWrapper>
    );
};

export default layout;
