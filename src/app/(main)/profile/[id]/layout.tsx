import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileBackground from "@/components/profile/ProfileBackground";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangleIcon, Ban, MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import ProfileNavHorizontal from "../../../../components/profile/ProfileNavHorizontal";
import ProfileUsername from "@/components/profile/ProfileUsername";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <div className="min-h-[200svh] w-full">
            <ProfileBackground></ProfileBackground>

            <div className="-my-20 md:-my-24 xl:-my-32 md:px-7 px-3 w-full flex flex-col md:flex-row justify-center items-center md:justify-between md:items-end gap-3">
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-end  mt-5">
                    <ProfileAvatar></ProfileAvatar>
                    <ProfileUsername></ProfileUsername>
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
