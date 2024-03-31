import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatRoom from "@/components/chat/room/ChatRoom";
import { Card } from "@/components/ui/card";
import SoketConnectWrapper from "@/components/wrappers/SoketConnectWrapper";
import { headers } from "next/headers";
import React from "react";

type Props = {};

const page = ({ params }: { params: { id: string } }) => {
    const headerList = headers();
    const isMobile = headerList.get("viewport") === "mobile";
    return (
        <SoketConnectWrapper>
            {!isMobile && <ChatSidebar></ChatSidebar>}
            <Card className="col-span-8">
                <ChatRoom chatId={parseInt(params.id)}></ChatRoom>
            </Card>
        </SoketConnectWrapper>
    );
};

export default page;
