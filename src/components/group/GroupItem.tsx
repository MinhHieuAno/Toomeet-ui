import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {};

const GroupItem = (props: Props) => {
    return (
        <Link
            href="/"
            className="flex justify-start items-start gap-3 w-full px-5 py-2 rounded-none text-left hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
            <Avatar className="rounded-md w-16 h-16">
                <AvatarImage
                    loading={"lazy"}
                    src={
                        "https://ik.imagekit.io/freeflo/production/42711af2-8a57-451a-9831-44c4bf57b9a7.png?tr=w-1920,q-75&alt=media&pr-true"
                    }
                ></AvatarImage>
                <AvatarFallback>oke</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex-shrink-0 flex-col ">
                <p className="text-pretty line-clamp-2 font-semibold h-12">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Debitis accusamus inventore error nostrum nisi ut soluta
                    voluptate! Rem doloribus tempore assumenda sunt sint alias
                    totam, optio sit dolorem? Laborum sunt tempore porro.
                    Voluptatem expedita ipsam quis eligendi molestiae, quisquam
                    officia perferendis necessitatibus veniam dicta vitae saepe
                    eveniet velit totam recusandae!
                </p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                    Hoạt động gần nhất: 11 tháng trước
                </p>
            </div>
        </Link>
    );
};

export default GroupItem;
