"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";

const ButtonBack = (props: ButtonProps) => {
    const router = useRouter();
    return (
        <Button {...props} onClick={() => router.back()}>
            {props.children || "back"}
        </Button>
    );
};

export default ButtonBack;
