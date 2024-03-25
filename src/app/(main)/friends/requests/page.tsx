import { Metadata } from "next";
import React from "react";
import FriendRequestSent from "./FriendRequestSent";
import FriendRequestReceived from "./FriendRequestReceived";

export const metadata: Metadata = {
    title: "Lời mời kết bạn",
};

const page = () => {
    return (
        <div className="space-y-6 mb-10">
            <FriendRequestReceived></FriendRequestReceived>
            <FriendRequestSent></FriendRequestSent>
        </div>
    );
};

export default page;
