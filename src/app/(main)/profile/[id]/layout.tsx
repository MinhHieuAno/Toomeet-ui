import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangleIcon, Ban, MoreHorizontal } from "lucide-react";
import { headers } from "next/headers";
import { ReactNode } from "react";
import ProfileNavHorizontal from "../../../../components/profile/ProfileNavHorizontal";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <div className="min-h-[200svh] w-full">
            <div className="relative w-full h-[240px] md:h-[300px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
                <div className="abs-center w-full h-full bg-black/50"></div>
                <img
                    className="w-full h-full object-cover rounded-[inherit]"
                    src="https://www.pixel4k.com/wp-content/uploads/2018/11/one-piece-anime_1541973527.jpg.webp"
                    alt="background"
                />
            </div>
            <div className="-my-20 md:-my-24 xl:-my-32 md:px-7 px-3 w-full flex flex-col md:flex-row justify-center items-center md:justify-between md:items-end gap-3">
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-end  mt-5">
                    <Avatar className="mt-4 h-[120px] w-[120px] md:h-[150px] md:w-[150px] xl:h-[180px] xl:w-[180px] md:border-[6px] border-[4px] border-white dark:border-slate-900 m-2">
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbIWZNylYkfK9l8OypZ5liDQgy6ukZLC2RUg&usqp=CAU"></AvatarImage>
                        <AvatarFallback>Minh Hieu</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <h2 className="text-2xl md:text-3xl  font-semibold">
                            Minh Hieu
                        </h2>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-3 md:gap-5">
                    <Button>Nhắn tin</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                <MoreHorizontal></MoreHorizontal>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex justify-start gap-3 items-center">
                                <AlertTriangleIcon size={20} />
                                Tố cáo
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-start gap-3 items-center">
                                <Ban size={20} />
                                Chặn
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* NAV */}
            <ProfileNavHorizontal></ProfileNavHorizontal>
            {children}
        </div>
    );
};

export default layout;
