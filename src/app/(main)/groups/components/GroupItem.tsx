import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Group } from "@/lib/group.utils";
import moment from "moment";
import Link from "next/link";

type Props = {
    group: Group;
};

const GroupItem = ({ group }: Props) => {
    return (
        <Link
            href={`/groups/${group.groupId}`}
            className="flex justify-start items-start gap-3 w-full px-4 md:px-5 py-2 rounded-none text-left hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
            <Avatar className="rounded-md w-12 h-12 md:w-16 md:h-16">
                <AvatarImage loading={"lazy"} src={group.avatar}></AvatarImage>
                <AvatarFallback>{group.name}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex-shrink-0 flex-col  justify-start items-start">
                <p className="text-pretty line-clamp-2 font-semibold ">
                    {group.name}
                </p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                    Hoạt động gần nhất: {moment(group.updatedAt).fromNow()}
                </p>
            </div>
        </Link>
    );
};

export default GroupItem;
