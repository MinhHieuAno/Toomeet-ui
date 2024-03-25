import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon, Settings } from "lucide-react";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    Icon: LucideIcon;
} & ButtonProps;

const RoomSettingItem = ({ children, Icon, ...props }: Props) => {
    return (
        <Button
            variant="ghost"
            className="w-full justify-start !px-5 !py-6 "
            {...props}
        >
            <Icon size={20}></Icon>
            <p className="mx-3">{children}</p>
        </Button>
    );
};

export default RoomSettingItem;
