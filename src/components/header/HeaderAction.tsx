import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import ButtonToggleTheme from "../button/ButtonToggleTheme";
import Notify from "../notify/Notify";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

type Props = {
    className?: string;
};

const HeaderAction = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-1 flex-shrink-0 justify-end items-center gap-1 md:gap-4",
                className
            )}
        >
            <ButtonToggleTheme />
            <Notify></Notify>
            <Link
                href="/messages"
                className={cn(buttonVariants({ variant: "ghost" }))}
            >
                <MessageCircle className="h-[1.2rem] w-[1.2rem]" />
            </Link>
            <ProfileMenu></ProfileMenu>
        </div>
    );
};

export default HeaderAction;
