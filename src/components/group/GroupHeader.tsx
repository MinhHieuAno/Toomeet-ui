import ChatSearch from "@/components/chat/ChatSearch";
import GroupList from "@/components/group/GroupList";
import GroupSearch from "@/components/group/GroupSearch";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Atom, Compass, Plus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const GroupHeader = (props: Props) => {
    return (
        <div>
            <div className="px-5 py-4">
                <div className="w-full flex justify-between items-center ">
                    <h1 className="text-2xl font-semibold text-muted-foreground">
                        Nhóm
                    </h1>
                    <div className="flex justify-end items-center gap-2">
                        <Link
                            className={cn(
                                "md:hidden",
                                buttonVariants({
                                    size: "icon",
                                    variant: "secondary",
                                })
                            )}
                            href="/groups/create"
                        >
                            <Plus size={20}></Plus>
                        </Link>

                        {/* <Button
                            variant="ghost"
                            className="text-muted-foreground"
                        >
                            <Settings></Settings>
                        </Button> */}
                    </div>
                </div>
                <GroupSearch></GroupSearch>
            </div>
            <Separator></Separator>
        </div>
    );
};

export default GroupHeader;
