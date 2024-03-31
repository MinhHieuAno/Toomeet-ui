import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Minh Hieu",
};

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="my-5 mx-auto max-w-[90rem]">
            {children}
        </MaxWidthWrapper>
    );
};

export default layout;
