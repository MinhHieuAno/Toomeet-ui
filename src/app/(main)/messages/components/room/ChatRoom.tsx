"use client";
import React from "react";
import RoomHeader from "./RoomHeader";
import InputMessage from "./input/InputMessage";
import MessageList from "./message/MessageList";
import { ChatRoomProvider } from "@/context/ChatRoomProvider";

type Props = { chatId: number };

const ChatRoom = ({ chatId }: Props) => {
    return (
        <ChatRoomProvider roomId={chatId}>
            <div className="w-full h-full flex flex-col justify-start">
                <RoomHeader className="w-full"></RoomHeader>
                <div className="relative w-full flex flex-col justify-start h-[78svh] md:h-[80svh]">
                    <MessageList className="flex-1 w-full h-full"></MessageList>
                    <InputMessage className="w-full"></InputMessage>
                </div>
            </div>
        </ChatRoomProvider>
    );
};

export default ChatRoom;
