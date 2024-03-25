import ChatRoom from "@/components/chat/room/ChatRoom";
import React from "react";

type Props = {};

const page = ({ params }: { params: { id: string } }) => {
    return <ChatRoom chatId={parseInt(params.id)}></ChatRoom>;
};

export default page;
