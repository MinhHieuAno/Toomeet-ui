import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-96 h-96">
                <img
                    src="/nothing.svg"
                    alt="nothing"
                    className="w-full h-full object-contain"
                />
            </div>
            <h2 className="text-center text-muted-foreground">
                Chưa có đoạn chat nào được chọn
            </h2>
        </div>
    );
};
export default page;
