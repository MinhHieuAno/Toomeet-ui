"use client";

import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

type Props = {};

const Comingsoon = (props: Props) => {
    const router = useRouter();
    return (
        <div className="text-center">
            <h3 className="text-sm text-muted-foreground">
                Tính năng này đang được phát triển
                <span
                    className="text-primary underline mx-2"
                    onClick={() => router.back()}
                >
                    quay lại
                </span>
            </h3>
        </div>
    );
};

export default Comingsoon;
