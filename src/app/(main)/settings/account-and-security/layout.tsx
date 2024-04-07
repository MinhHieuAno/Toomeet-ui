import ButtonBack from "@/components/button/ButtonBack";
import SettingSidebar from "@/components/setting/SettingSidebar";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Tài khoản và Bảo mật",
};

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper className="xl:grid xl:grid-cols-10 gap-2 py-4">
            <SettingSidebar className="col-start-1 col-end-3 hidden md:flex"></SettingSidebar>
            <div className="col-start-3 col-end-11">
                <div className="flex justify-start gap-2 items-center mb-5">
                    <ButtonBack className="md:hidden "></ButtonBack>
                    <h1 className="text-lg lg:text-2xl font-semibold">
                        Tài khoản và bảo mật
                    </h1>
                </div>

                {children}
            </div>
        </MaxWidthWrapper>
    );
};

export default layout;
