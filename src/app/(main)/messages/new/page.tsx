import ChatDemo from "@/components/chat/ChatDemo";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="p-5 w-full h-full">
            <ChatDemo></ChatDemo>
        </div>
    );
};

export default page;
