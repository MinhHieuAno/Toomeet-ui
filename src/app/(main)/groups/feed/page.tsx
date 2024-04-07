import GroupSidebar from "@/components/group/GroupSidebar";
import NewsFeed from "@/components/post/NewsFeed";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="">
            <NewsFeed></NewsFeed>
        </div>
    );
};

export default page;
