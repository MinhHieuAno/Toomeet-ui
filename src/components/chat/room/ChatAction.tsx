import { Button } from "@/components/ui/button";
import { Info, Phone, Video } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import RoomSetting from "./setting/RoomSetting";

type Props = {};

const ChatAction = (props: Props) => {
    return (
        <div className="flex justify-end items-center gap-2">
            <Button variant="ghost">
                <Video size={20}></Video>
            </Button>
            <Button variant="ghost">
                <Phone size={20}></Phone>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <Info size={20}></Info>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <RoomSetting></RoomSetting>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ChatAction;
