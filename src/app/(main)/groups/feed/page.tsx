import ButtonBack from "@/components/button/ButtonBack";
import NewsFeed from "@/components/feed/NewsFeed";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="">
            <div className="my-4 md:hidden flex justify-start gap-3">
                <ButtonBack className=" "></ButtonBack>
                <h1 className="font-semibold text-lg text-muted-foreground">
                    Bài viết nhóm
                </h1>
            </div>
            <NewsFeed></NewsFeed>
        </div>
    );
};

export default page;
