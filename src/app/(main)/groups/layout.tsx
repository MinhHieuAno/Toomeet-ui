import Sidebar from "@/components/sidebar/Sidebar";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="grid grid-cols-8">
            {children}
        </MaxWidthWrapper>
    );
};

export default layout;
