"use client";
import React, { useState } from "react";
import FriendCard from "./FriendCard";
import ButtonAddFriend from "../button/ButtonAddFriend";
import { Button } from "@/components/ui/button";
import { Friend } from "@/lib/friend.utils";
import { send } from "process";
import ButtonCancelAddFriend from "../button/ButtonCancelAddFriend";

type Props = {
    data: Friend;
    onDelete?: () => void;
};

const AddFriendCard = ({ data, onDelete }: Props) => {
    const [requestId, setRequestId] = useState<number | undefined>();

    return (
        <FriendCard data={data}>
            <div className="w-full mt-5">
                {!requestId && (
                    <div className=" w-full grid grid-cols-2 gap-2">
                        <ButtonAddFriend
                            onSendSucces={(requestId) => {
                                setRequestId(requestId);
                            }}
                            friend={data}
                        >
                            Kết bạn
                        </ButtonAddFriend>
                        <Button variant="secondary" onClick={onDelete}>
                            Hủy
                        </Button>
                    </div>
                )}

                {requestId && (
                    <ButtonCancelAddFriend
                        requestId={requestId}
                        friend={data}
                        className="w-full"
                        onSuccess={() => setRequestId(undefined)}
                    >
                        Hủy Yêu cầu
                    </ButtonCancelAddFriend>
                )}
            </div>
        </FriendCard>
    );
};

export default AddFriendCard;
