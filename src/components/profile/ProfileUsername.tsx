"use client";
import { useAuth } from "@/context/AuthProvider";
import React from "react";

type Props = {};

const ProfileUsername = (props: Props) => {
    const { account } = useAuth();
    return (
        <div>
            <h2 className="text-2xl md:text-3xl  font-semibold">
                {account?.user.name}
            </h2>
        </div>
    );
};

export default ProfileUsername;
