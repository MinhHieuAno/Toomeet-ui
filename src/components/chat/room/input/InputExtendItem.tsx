"use client";
import React, { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    label: string;
};

const InputExtendItem = ({ icon, label }: Props) => {
    return (
        <div className="w-full flex justify-start items-center gap-2 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer">
            {icon}
            <p>{label} </p>
        </div>
    );
};

export default InputExtendItem;
