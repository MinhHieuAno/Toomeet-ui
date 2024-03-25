"use client";
import { createChatRoomSchema } from "@/schema/chat.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

type CreateChatRoomProviderProps = {
    children: React.ReactNode;
};

interface ICreateChatRoomContext {}

const CreateChatRoomContext =
    React.createContext<ICreateChatRoomContext | null>(null);

const CreateChatRoomProvider: React.FC<CreateChatRoomProviderProps> = ({
    children,
}) => {
    const form = useForm<z.infer<typeof createChatRoomSchema>>({
        resolver: zodResolver(createChatRoomSchema),
        defaultValues: {
            members: [],
            type: "GROUP",
            color: "#7e22ce",
        },
    });

    const values = {};

    return (
        <CreateChatRoomContext.Provider value={values}>
            <FormProvider {...form}>{children}</FormProvider>
        </CreateChatRoomContext.Provider>
    );
};

const useCreateChatRoom = () => {
    const context = useContext(CreateChatRoomContext);
    if (typeof context === "undefined" || !context) {
        throw new Error(
            "useCreateChatRoom must be used within CreateChatRoomProvider"
        );
    }
    return context;
};

export { CreateChatRoomProvider, useCreateChatRoom };
