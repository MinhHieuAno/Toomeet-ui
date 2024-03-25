import { Metadata } from "next";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return <div className="col-span-8">{children}</div>;
};

export default layout;
