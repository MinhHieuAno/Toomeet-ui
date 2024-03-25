import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import GroupItem from "./GroupItem";

type Props = {};

const GroupList = (props: Props) => {
    return (
        <div className="py-2">
            <div className="w-full flex justify-between items-center px-4">
                <h4 className="text-sm text-muted-foreground">
                    Nhóm đã tham gia
                </h4>
                <Link
                    href="/groups/joins"
                    className={cn(buttonVariants({ variant: "link" }))}
                >
                    Xem tất cả
                </Link>
            </div>
            <div className="my-1">
                {new Array(20).fill(0).map((_, index) => (
                    <GroupItem key={index}></GroupItem>
                ))}
            </div>
        </div>
    );
};

export default GroupList;
