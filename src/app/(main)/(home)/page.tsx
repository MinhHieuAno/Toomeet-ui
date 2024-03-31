"use client";
import Navbar from "@/components/header/Navbar";
import NewsFeed from "@/components/post/NewsFeed";
import CreatePost from "@/components/post/create/CreatePost";
import { useSocket } from "@/context/SocketProvider";
import { useEffect } from "react";

const Home = () => {
    const { connect, disconnect } = useSocket();
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

    return (
        <div className="">
            <CreatePost></CreatePost>
            <NewsFeed></NewsFeed>
            <Navbar className="fixed md:hidden -bottom-[8px] p-3 pb-5 w-svw left-[50%] -translate-x-[50%] dark:bg-slate-900 z-50 bg-white da col-start-4 col-end-10 mx-0 2xl:mx-16 shadow-xl border-t"></Navbar>
        </div>
    );
};

export default Home;
