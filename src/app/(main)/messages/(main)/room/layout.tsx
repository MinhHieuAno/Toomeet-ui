import ChatSidebar from "@/components/chat/ChatSidebar";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    const headerList = headers();
    const isDesktop = headerList.get("viewport") === "desktop";
    return (
        <>
            {isDesktop && <ChatSidebar></ChatSidebar>}
            {children}
        </>
    );
};

export default layout;
