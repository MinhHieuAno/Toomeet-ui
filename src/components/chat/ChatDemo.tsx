"use client";
import { useCreateChatRoom } from "@/context/CreateChatRoomProvider";
import { createChatRoomSchema } from "@/schema/chat.schema";
import React from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

const ChatDemo = (props: Props) => {
    const form = useFormContext<z.infer<typeof createChatRoomSchema>>();
    return (
        <div className="w-full h-full flex  flex-col relative">
            <div
                className="absolute top-[10%] right-[20%] bg-primary px-5 py-4 rounded-md text-white  transition-all"
                style={{ backgroundColor: form.watch("color") }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                quis.
            </div>
            <div className="bg-slate-200 dark:bg-slate-900 dark:text-slate-200 px-5 py-4 rounded-md text-back absolute top-[20%] left-[20%] ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                quis.
            </div>
            <div className="bg-slate-200 dark:bg-slate-900 dark:text-slate-200 px-5 py-4 rounded-md text-back absolute top-[40%] left-[10%] ">
                Lorem ipsum dolor sit
            </div>
            <div
                className="bg-primary px-5 py-4 rounded-md text-white  absolute top-[80%] right-[20%] "
                style={{ backgroundColor: form.watch("color") }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                quis.
            </div>
            <div
                className="bg-primary px-5 py-4 rounded-md text-white   absolute top-[50%] right-[10%] "
                style={{ backgroundColor: form.watch("color") }}
            >
                Lorem ipsum dolor sit
            </div>

            <iframe
                className="abs-center w-[400px] h-[400px] "
                src="https://lottie.host/embed/a580cbcd-31e1-498b-9657-ec539fc4c3bc/KP4Zkmtvxg.json"
            ></iframe>

            <h2 className="text-2xl text-muted-foreground font-semibold">
                {" "}
                {form.watch("name")}
            </h2>
        </div>
    );
};

export default ChatDemo;
