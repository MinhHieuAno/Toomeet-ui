import React from "react";
import DiscoverGroupList from "../../components/DiscoverGroupList";
import ButtonBack from "@/components/button/ButtonBack";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="">
            <div className="flex justify-start items-center gap-2 mb-8">
                <ButtonBack className="md:hidden"></ButtonBack>
                <h1 className="text-lg font-semibold text-muted-foreground ">
                    Gợi ý nhóm cho bạn
                </h1>
            </div>
            <DiscoverGroupList></DiscoverGroupList>
        </div>
    );
};

export default page;
