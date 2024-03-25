import { Friend } from "@/lib/friend.utils";
import { FC } from "react";
import {
    FriendSearch,
    FriendSearchInput,
    FriendSearchResult,
} from "../search/FriendSearch";
import { ScrollArea } from "../ui/scroll-area";
import { cn, getUsername } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";

type ChooseMemberProps = {
    members: Friend[];
    onChange?: (member: Friend[]) => void;
};
const ChooseMember: FC<ChooseMemberProps> = ({ members, onChange }) => {
    return (
        <FriendSearch>
            <FriendSearchInput />
            <FriendSearchResult
                render={({ results, isLoading }) => (
                    <div className="w-full h-full">
                        <ScrollArea className="h-[320px]">
                            {isLoading && (
                                <div className="w-full h-full flex justify-center items-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                                </div>
                            )}
                            {!isLoading &&
                                [
                                    ...members,
                                    ...results.filter(
                                        (friend) =>
                                            !members.some(
                                                (member) =>
                                                    member.id === friend.id
                                            )
                                    ),
                                ].map((friend, index) => (
                                    <label
                                        htmlFor={`checkbox-member-${friend.id}`}
                                        key={index}
                                        className={cn(
                                            "flex justify-between items-center gap-2 w-full px-5 py-3 rounded-md hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-900"
                                        )}
                                    >
                                        <div className="flex justify-start items-center gap-2">
                                            <div>
                                                <Avatar>
                                                    <AvatarImage
                                                        src={
                                                            friend.profile
                                                                .avatar?.url
                                                        }
                                                    ></AvatarImage>
                                                    <AvatarFallback>
                                                        {
                                                            getUsername(
                                                                friend.name
                                                            )[0]
                                                        }
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <h4 className="">{friend.name}</h4>
                                        </div>
                                        <Checkbox
                                            onCheckedChange={(check) => {
                                                const memberList =
                                                    members.filter(
                                                        (member) =>
                                                            member.id !=
                                                            friend.id
                                                    );
                                                if (check)
                                                    onChange?.([
                                                        ...memberList,
                                                        friend,
                                                    ]);
                                                else onChange?.(memberList);
                                            }}
                                            checked={members.some(
                                                (member) =>
                                                    member.id === friend.id
                                            )}
                                            id={`checkbox-member-${friend.id}`}
                                        />
                                    </label>
                                ))}
                        </ScrollArea>
                    </div>
                )}
            />
        </FriendSearch>
    );
};

export default ChooseMember;
