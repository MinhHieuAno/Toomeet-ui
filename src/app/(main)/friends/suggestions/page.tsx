import { Metadata } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";

export const metadata: Metadata = {
    title: "Giợi ý",
};

const FriendSuggestion = dynamic(() => import("./FriendSuggestion"), {
    ssr: false,
});

const page = () => {
    return (
        <div className="w-full h-full">
            <FriendSuggestion></FriendSuggestion>
        </div>
    );
};

export default page;
