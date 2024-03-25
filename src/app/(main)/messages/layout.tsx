import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Trò chuyện",
};

type Props = { children: ReactNode };
const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="grid grid-cols-8">
            {children}
        </MaxWidthWrapper>
    );
};

export default layout;
