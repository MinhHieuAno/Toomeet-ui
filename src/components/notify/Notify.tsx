"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { useSocket } from "@/context/SocketProvider";
import api from "@/lib/api";
import { NotifyType } from "@/lib/notify.utils";
import { cn } from "@/lib/utils";
import {
    BellIcon,
    MessageSquareDot,
    MoreHorizontal,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import NotifyItem from "./NotifyItem";
import { usePathname } from "next/navigation";

type Props = {};

// const notifications: NotifyType[] = [
//     // Group notification
//     {
//         sender: {
//             id: 123,
//             avatar: {
//                 url: "https://source.unsplash.com/random",
//                 format: "png",
//             },
//             name: "Your Team",
//         },
//         tag: NotifyTag.GROUP,
//         content:
//             "A new project discussion has started in the 'Project X' group. Click here to join the conversation.",
//         timestamp: new Date().toISOString(),
//     },

//     // Comment notification
//     {
//         sender: {
//             id: 456,
//             avatar: {
//                 url: "https://source.unsplash.com/random",
//                 format: "jpg",
//             },
//             name: "John Doe",
//         },
//         tag: NotifyTag.COMMENT,
//         content: "John Doe commented on your post: 'Great insights!'",
//         timestamp: new Date().toISOString(),
//     },

//     // System notification
//     {
//         sender: {
//             id: 0, // System notifications typically don't have a sender ID
//             avatar: null,
//             name: "System",
//         },
//         tag: NotifyTag.SYSTEM,
//         content: "Your account password has been successfully updated.",
//         timestamp: new Date().toISOString(),
//     },

//     // Friend notification
//     {
//         sender: {
//             id: 789,
//             avatar: {
//                 url: "https://source.unsplash.com/random",
//                 format: "png",
//             },
//             name: "Jane Smith",
//         },
//         tag: NotifyTag.FRIEND,
//         content: "Jane Smith sent you a friend request.",
//         timestamp: new Date().toISOString(),
//     },
// ];

const Notify = (props: Props) => {
    const [hasNotify, setHasNotify] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<NotifyType[]>([]);
    const { account } = useAuth();
    const { getConnection } = useSocket();

    useEffect(() => {
        (async () => {
            try {
                const response = await api("/notifications", {
                    params: {
                        l: 5,
                    },
                });
                const data = response.data;
                setNotifications(
                    data.content.map((notify: any) => ({
                        ...notify,
                        tag: notify.type,
                    }))
                );
            } catch (error) {
                console.log("Load notifications error::: " + error);
            }
        })();
    }, []);

    useEffect(() => {
        const client = getConnection();
        if (!client || !client.connected || !account || !account.user) return;
        const subscription = client.subscribe(
            `/notifications/${account.user.id}`,
            (message) => {
                const notify = JSON.parse(message.body);
                // alert("has notify");
                setNotifications((notifications) => [
                    { ...notify, tag: notify.type },
                    ...notifications,
                ]);
                setHasNotify(true);
            }
        );
        return () => subscription.unsubscribe();
    }, [account, account?.user, account?.user?.id]);

    return (
        <DropdownMenu onOpenChange={(open) => open && setHasNotify(false)}>
            <DropdownMenuTrigger asChild>
                <Button className="relative" variant={"ghost"}>
                    <BellIcon className="h-[1.2rem] w-[1.2rem]" />
                    {hasNotify && (
                        <>
                            <span className=" absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 flex justify-center items-center"></span>
                            <span className=" absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 flex justify-center items-center animate-ping"></span>
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 min-w-min">
                <div className="px-5 py-4 w-full flex justify-between items-center gap-4">
                    <h4 className="text-base lg:text-xl font-semibold">
                        Thông báo
                    </h4>
                    <Button
                        onClick={() => setNotifications([])}
                        variant="ghost"
                    >
                        Xóa tất cả
                    </Button>
                    <NotifyMoreAction></NotifyMoreAction>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <div className="max-h-[calc(100svh-200px)] h-min overflow-y-scroll custom-scroll">
                        {notifications.map((notify, index) => (
                            <NotifyItem key={index} {...notify}></NotifyItem>
                        ))}
                    </div>
                </DropdownMenuGroup>
                <div className="w-full h-full flex justify-center">
                    {notifications.length > 0 ? (
                        <Link
                            href="/notifications"
                            className={cn(buttonVariants({ variant: "link" }))}
                        >
                            Xem tất cả
                        </Link>
                    ) : (
                        <div className="w-[60%] h-[60%] p-5">
                            <img
                                src="/not-found.svg"
                                alt="not-found-img"
                                className="w-full h-full object-cover"
                            />
                            <p className="my-5 text-xs text-muted-foreground text-center">
                                Không có thông báo
                            </p>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const NotifyMoreAction = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="">
                    <MoreHorizontal size={20} className="text-xs" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 min-w-min">
                <DropdownMenuItem className="flex justify-start items-center gap-3">
                    <Settings size={20}></Settings>
                    <p>Cài đặt thông báo</p>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex justify-start items-center gap-3">
                    <MessageSquareDot size={20} />
                    <p>Mở thông báo</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notify;
