import "@/app/reaction.css";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Trò chuyện",
};

type Props = { children: ReactNode };
const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="xl:grid xl:grid-cols-10 gap-2 py-4">
            {children}
        </MaxWidthWrapper>
    );
};

export default layout;
