"use client";
import { useSocket } from "@/context/SocketProvider";
import React, { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const SoketConnectWrapper = ({ children }: Props) => {
    // const { e, disconnect } = useSocket();

    // useEffect(() => {
    //     connect(1);

    //     return () => {
    //         disconnect();
    //     };
    // }, []);
    return <>{children}</>;
};

export default SoketConnectWrapper;
