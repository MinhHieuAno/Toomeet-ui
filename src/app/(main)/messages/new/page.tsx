import React from "react";
import ChatDemo from "../components/ChatDemo";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="p-5 w-full h-full">
            <ChatDemo></ChatDemo>
        </div>
    );
};

export default page;
