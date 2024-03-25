"use client";
import ButtonCancelAddFriend from "@/components/button/ButtonCancelAddFriend";
import FriendCard from "@/components/card/FriendCard";
import FriendCardLoading from "@/components/card/FriendCardLoading";

import api from "@/lib/api";
import { Friend } from "@/lib/friend.utils";
import { useEffect, useRef, useState } from "react";

type Props = {};

const FriendRequestSent = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [friends, setFriends] = useState<
        { friend: Friend; requestId: number }[]
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
                const response = await api("/users/friends/request/sent");
                setFriends((friends) => [
                    ...friends,
                    ...response.data.map((data: any) => ({
                        friend: data.receiver,
                        requestId: data.requestId,
                    })),
                ]);
            } catch (error) {
                alert(error);
                console.log(error);
            }

            setLoading(false);
        })();
    }, []);

    const deleteCard = (id: number) => {
        setFriends((friends) =>
            friends.filter(({ requestId }) => requestId !== id)
        );
    };

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-bold text-muted-foreground mb-5">
                Yêu cầu đã gửi
            </h2>
            {!loading && friends?.length <= 0 && (
                <div className="w-full h-full flex justify-center items-center flex-col">
                    <h3 className="text-lg">Bạn chưa gửi yêu cầu nào</h3>
                </div>
            )}
            <div className="w-full h-full grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {!loading &&
                    friends.map(({ friend, requestId }, index) => (
                        <FriendCard data={friend} key={index}>
                            <ButtonCancelAddFriend
                                requestId={requestId}
                                friend={friend}
                                className="w-full mt-5"
                                onSuccess={() => deleteCard(requestId)}
                            >
                                Hủy Yêu cầu
                            </ButtonCancelAddFriend>
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

export default FriendRequestSent;
