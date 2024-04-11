import Navbar from "@/components/header/Navbar";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import React, { ReactNode } from "react";
import GroupSidebar from "../components/GroupSidebar";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="md:grid md:grid-cols-12">
            <GroupSidebar className="hidden md:block col-start-1 col-end-4"></GroupSidebar>
            <div className="col-start-4 col-end-9">{children}</div>
            <Navbar className="fixed md:hidden -bottom-[8px] p-3 pb-5 w-svw left-[50%] -translate-x-[50%] dark:bg-slate-900 z-50 bg-white da col-start-4 col-end-10 mx-0 2xl:mx-16 shadow-xl border-t"></Navbar>
        </MaxWidthWrapper>
    );
};

export default layout;
