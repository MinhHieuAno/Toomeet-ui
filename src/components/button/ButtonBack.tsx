"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type Props = {
    backUrl?: string;
} & ButtonProps;

const ButtonBack = ({ backUrl, ...props }: Props) => {
    const router = useRouter();
    return (
        <Button
            variant="secondary"
            size="icon"
            {...props}
            onClick={() => (backUrl ? router.replace(backUrl) : router.back())}
        >
            {props.children || <ChevronLeft />}
        </Button>
    );
};

export default ButtonBack;
