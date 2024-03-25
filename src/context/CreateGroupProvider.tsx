"use client";
import { GroupPrivacy } from "@/lib/group.utils";
import { createGroupSchema } from "@/schema/group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

type CreateGroupProviderProps = {
    children: React.ReactNode;
};

interface ICreateGroupContext {}

const CreateGroupContext = React.createContext<ICreateGroupContext | null>(
    null
);

const CreateGroupProvider: React.FC<CreateGroupProviderProps> = ({
    children,
}) => {
    const form = useForm<z.infer<typeof createGroupSchema>>({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {
            privacy: GroupPrivacy.PUBLIC,
        },
    });

    const values = {};

    return (
        <CreateGroupContext.Provider value={values}>
            <FormProvider {...form}>{children}</FormProvider>
        </CreateGroupContext.Provider>
    );
};

const useCreateGroup = () => {
    const context = useContext(CreateGroupContext);
    if (typeof context === "undefined" || !context) {
        throw new Error(
            "useCreateGroup must be used within CreateGroupProvider"
        );
    }
    return context;
};

export { CreateGroupProvider, useCreateGroup };
