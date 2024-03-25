import { Card } from "@/components/ui/card";
import React from "react";
import "@/app/loader.css";
type Props = {};

const loading = (props: Props) => {
    return (
        <div className="w-svw h-svh flex justify-center items-center flex-col ">
            <img src="/loader.svg" alt="loader" />
            <h1 className="mt-5 ">Đang tải đợi xíu nhé</h1>
        </div>
    );
};

export default loading;
