"use client";
import React, { useContext, useEffect, useState } from "react";
import { Client, Frame, over } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

type SocketProviderProps = {
    children: React.ReactNode;
};

interface ISocketContext {
    connect: () => void;
    disconnect: () => void;
    onConnected: (frame?: Frame) => void;
    onError: (error: Frame | string) => void;
    onDisconnect: () => void;
    client: Client | null;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);

    const connect = () => {
        let Sock = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URL!);

        const client = over(Sock);
        client.connect(
            {
                Authorization: "Bearer " + Cookies.get("access_token"),
            },
            onConnected,
            onError
        );
        setStompClient(client);
    };

    const disconnect = () => {
        if (!stompClient) return;
        stompClient.disconnect(onDisconnect);
    };

    const onConnected = (frame?: Frame) => {
        console.log("connected");
    };
    const onError = (error: Frame | string) => {
        console.log("connect error");
    };

    const onDisconnect = () => {
        console.log("disconnect success");
    };

    const values = {
        client: stompClient,
        connect,
        disconnect,
        onConnected,
        onError,
        onDisconnect,
    };

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const context = useContext(SocketContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};

export { SocketProvider, useSocket };
