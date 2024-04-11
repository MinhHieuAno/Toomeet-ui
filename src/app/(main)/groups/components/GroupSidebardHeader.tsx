import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import ButtonBack from "@/components/button/ButtonBack";

type Props = {};

const GroupSidebarHeader = (props: Props) => {
    return (
        <div>
            <div className="px-4 md:px-5 md:py-4 py-2">
                <div className="w-full flex justify-between items-center ">
                    <ButtonBack className="md:hidden"></ButtonBack>
                    <h1 className="text-xl md:text-2xl font-semibold text-muted-foreground">
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
                            <Plus size={18}></Plus>
                        </Link>

                        {/* <Button
                            variant="ghost"
                            className="text-muted-foreground"
                        >
                            <Settings></Settings>
                        </Button> */}
                    </div>
                </div>
                {/* <GroupSearch></GroupSearch> */}
            </div>
            <Separator></Separator>
        </div>
    );
};

export default GroupSidebarHeader;
