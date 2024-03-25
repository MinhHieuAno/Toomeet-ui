import { Metadata } from "next";
import React from "react";
import AllFriend from "./AllFriend";

export const metadata: Metadata = {
    title: "Bạn bè",
};
const page = () => {
    return (
        <div className="w-full h-full">
            <AllFriend></AllFriend>
        </div>
    );
};

export default page;
