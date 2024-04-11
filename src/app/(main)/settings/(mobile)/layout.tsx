import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import SettingSidebar from "../components/SettingSidebar";

export const metadata: Metadata = {
    title: {
        default: "Cài đặt chung",
        template: "Cài đặt | %s ",
    },
};

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    const headerList = headers();
    const isDesktop = headerList.get("viewport") === "desktop";
    return (
        <MaxWidthWrapper className="xl:grid xl:grid-cols-10 gap-2 py-4">
            <SettingSidebar className="md:hidden"></SettingSidebar>
            {isDesktop && children}
        </MaxWidthWrapper>
    );
};

export default layout;
