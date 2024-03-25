"use client";
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
        </div>
    );
};

export default Home;
