import NewsFeed from "@/components/post/NewsFeed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    AlertTriangleIcon,
    Ban,
    GraduationCap,
    Home,
    LucideIcon,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="w-full min-h-[100svh] xl:grid xl:grid-cols-10 grid-cols-1 gap-2">
            <Card className="col-span-3 h-max max-w-full mt-10">
                <CardHeader className="text-lg font-semibold text-muted-foreground">
                    Giới thiệu
                </CardHeader>
                <Separator></Separator>
                <div className="p-3">
                    <div className=" text-pretty line-clamp-5">
                        Lorem ipsum dolor sit amet consectetur a
                    </div>
                    <div className="mt-4 space-y-2">
                        <DesctionItem label="Học vấn" Icon={GraduationCap}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod quis vel enim corrupti vero culpa
                            adipisci quas iusto soluta veniam.
                        </DesctionItem>
                        <DesctionItem label="Địa chỉ" Icon={Home}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod quis vel enim corrupti vero culpa
                            adipisci quas iusto soluta veniam.
                        </DesctionItem>
                        <DesctionItem label="Địa chỉ" Icon={Home}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod quis vel enim corrupti vero culpa
                            adipisci quas iusto soluta veniam.
                        </DesctionItem>
                    </div>
                </div>
            </Card>

            <div className=" col-span-6 h-full">
                <NewsFeed></NewsFeed>
            </div>
        </div>
    );
};

type DesctionItemProps = {
    label: string;
    Icon: LucideIcon;
    children: ReactNode;
};

const DesctionItem: FC<DesctionItemProps> = ({ label, Icon, children }) => {
    return (
        <div className="flex justify-start items-center gap-3">
            <Icon size={25} className="flex-shrink-0" />
            <p className="line-clamp-1 text-sm">
                <span className="font-semibold">{label}: </span> Lorem ipsum
                {children}
            </p>
        </div>
    );
};

export default page;
