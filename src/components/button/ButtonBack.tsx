"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
    backUrl?: string;
} & ButtonProps;

const ButtonBack = ({ backUrl, ...props }: Props) => {
    const router = useRouter();
    return (
        <Button
            {...props}
            onClick={() => (backUrl ? router.replace(backUrl) : router.back())}
        >
            {props.children || "back"}
        </Button>
    );
};

export default ButtonBack;
