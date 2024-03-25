import GroupList from "@/components/group/GroupList";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Atom, Compass, Plus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import Header from "./GroupHeader";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
    return (
        <>
            <Sidebar className="col-start-1 col-end-3">
                <SidebarBlock fullScreen>
                    <Header></Header>
                    <ScrollArea className="h-[650px]">
                        <div>
                            <Link
                                href="/groups/discover"
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full justify-start px-5 py-6 rounded-none gap-2 text-base"
                                )}
                            >
                                <Button
                                    size="icon"
                                    className="rounded-full"
                                    variant="secondary"
                                >
                                    <Compass className="w-4 h-4" />
                                </Button>
                                <span>Khám phá</span>
                            </Link>
                            <Link
                                href="/groups/joins"
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full justify-start px-5 py-6 rounded-none gap-2 text-base"
                                )}
                            >
                                <Button
                                    size="icon"
                                    className="rounded-full"
                                    variant="secondary"
                                >
                                    <Atom className="w-4 h-4" />
                                </Button>
                                <span>Nhóm của bạn</span>
                            </Link>
                            <div className="w-full px-3">
                                <Link
                                    href="/groups/create"
                                    className={cn(
                                        buttonVariants(),
                                        "my-3 w-full font-semibold"
                                    )}
                                >
                                    <Plus className="w-4 h-4 mx-2" />
                                    Tạo nhóm{" "}
                                </Link>
                            </div>
                        </div>
                        <Separator></Separator>
                        <GroupList></GroupList>
                    </ScrollArea>
                </SidebarBlock>
            </Sidebar>
            <div className="col-start-3 col-end-9 py-5">{children}</div>
        </>
    );
};

export default layout;
