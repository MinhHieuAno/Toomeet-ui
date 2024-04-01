"use client";
import Navbar from "@/components/header/Navbar";
import Notify from "@/components/notify/Notify";
import NewsFeed from "@/components/post/NewsFeed";
import CreatePost from "@/components/post/create/CreatePost";

const Home = () => {
    // useEffect(() => {
    //     const visibilitychangeEvent = () => {
    //         if (document.visibilityState === "hidden") {
    //             new Notification("Quay lại đây bạn ơi", {
    //                 body: "xin chao",
    //                 icon: "/logo.svg",
    //                 tag: "come-back",
    //             });
    //         }
    //     };
    //     document.addEventListener("visibilitychange", visibilitychangeEvent);

    //     return () =>
    //         document.removeEventListener(
    //             "visibilitychange",
    //             visibilitychangeEvent
    //         );
    // }, []);

    const handleShowNotify = () => {
        Notification.requestPermission().then((permissions) => {
            if (permissions === "granted") {
                new Notification("Hello world", {
                    body: "xin chao",
                    icon: "/logo.svg",
                });
            }
        });
    };

    return (
        <div className="">
            <CreatePost></CreatePost>
            <NewsFeed></NewsFeed>
            <Navbar className="fixed md:hidden -bottom-[8px] p-3 pb-5 w-svw left-[50%] -translate-x-[50%] dark:bg-slate-900 z-50 bg-white da col-start-4 col-end-10 mx-0 2xl:mx-16 shadow-xl border-t"></Navbar>
        </div>
    );
};

export default Home;
