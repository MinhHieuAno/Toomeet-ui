"use client";
import { useSocket } from "@/context/SocketProvider";
import React, { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const SoketConnectWrapper = ({ children }: Props) => {
    const { connect, disconnect } = useSocket();

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);
    return <>{children}</>;
};

export default SoketConnectWrapper;
