"use client";
import ButtonAcceptFriend from "@/components/button/ButtonAcceptFriend";
import ButtonRejectFriend from "@/components/button/ButtonRejectFriend";
import AddFriendCard from "@/components/card/AddFriendCard";
import FriendCard from "@/components/card/FriendCard";
import FriendCardLoading from "@/components/card/FriendCardLoading";
import api from "@/lib/api";
import { Friend } from "@/lib/friend.utils";
import { useEffect, useRef, useState } from "react";

type Props = {};

const FriendRequestReceived = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [friends, setFriends] = useState<
        { requestId: number; friend: Friend }[]
    >([]);

    const loaded = useRef<boolean>(false);

    useEffect(() => {
        if (loaded.current) return;

        if (!loaded.current) {
            loaded.current = true;
        }

        (async () => {
            setLoading(true);
            try {
                const response = await api("/users/friends/request/received");
                setFriends((friends) => [
                    ...friends,
                    ...response.data.map((data: any) => ({
                        requestId: data.requestId,
                        friend: data.sender,
                    })),
                ]);
            } catch (error) {
                alert(error);
                console.log(error);
            }

            setLoading(false);
        })();
    }, []);

    const removeCard = (id: number) => {
        setFriends((data) =>
            data.filter(({ requestId, friend }) => requestId != id)
        );
    };

    return (
        <div className="w-full h-full">
            <h2 className="text-xl md:text-2xl font-bold text-muted-foreground mb-5">
                Yêu cầu kết bạn
            </h2>
            {!loading && friends?.length <= 0 && (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <h3 className="text-sm md:text-lg">Không có yêu cầu nào</h3>
                </div>
            )}
            <div className="w-full h-full grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {!loading &&
                    friends.map(({ friend, requestId }, index) => (
                        <FriendCard data={friend} key={index}>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <ButtonAcceptFriend
                                    requestId={requestId}
                                    friend={friend}
                                    onSuccess={() => removeCard(requestId)}
                                >
                                    Đồng ý
                                </ButtonAcceptFriend>
                                <ButtonRejectFriend
                                    requestId={requestId}
                                    friend={friend}
                                    onSuccess={() => removeCard(requestId)}
                                >
                                    Từ chối
                                </ButtonRejectFriend>
                            </div>
                        </FriendCard>
                    ))}

                {loading &&
                    new Array(8)
                        .fill(0)
                        .map((_, index) => <FriendCardLoading key={index} />)}
            </div>
        </div>
    );
};

export default FriendRequestReceived;
