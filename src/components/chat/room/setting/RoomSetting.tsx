"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useChatRoom } from "@/context/ChatRoomProvider";
import {
    Bell,
    Palette,
    Settings,
    Trash,
    UserRoundPlus,
    Users,
} from "lucide-react";
import RoomSettingItem from "./RoomSettingItem";

import { useToast } from "@/components/ui/use-toast";
import AddMemberDialog from "./AddMemberDialog";
import UpdateAvtar from "./UpdateAvtar";
import UpdateRoomName from "./UpdateRoomName";
import ViewInviteLinkDialog from "./ViewInviteLinkDialog";
import ViewMemberDialog from "./ViewMemberDialog";
import api from "@/lib/api";
import LeaveRoom from "./LeaveRoom";
import ThemeSettingDialog from "./ThemeSettingDialog";
import DeleteMessage from "./DeleteMessage";

type Props = {};

const RoomSetting = (props: Props) => {
    const { room, setting, members } = useChatRoom();
    const { toast } = useToast();

    return (
        <div className="space-y-5">
            <SheetHeader>
                <SheetTitle>Thông tin trò chuyện</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center gap-5">
                <div className="relative w-max mx-auto">
                    <UpdateAvtar></UpdateAvtar>
                    <span className="w-3 h-3 bottom-0 right-0 rounded-full bg-green-500 absolute animate-ping"></span>
                    <span className="w-3 h-3 bottom-0 right-0 rounded-full bg-green-500 absolute"></span>
                </div>
                <UpdateRoomName></UpdateRoomName>
            </div>
            <div className="w-full flex justify-center items-center gap-3">
                <Button size="icon" variant="secondary">
                    <Bell size={20} />
                </Button>
                <AddMemberDialog>
                    <Button size="icon" variant="secondary">
                        <UserRoundPlus />
                    </Button>
                </AddMemberDialog>
                <Button size="icon" variant="secondary">
                    <Settings />
                </Button>
            </div>
            <Separator></Separator>
            <div>
                <ViewMemberDialog>
                    <RoomSettingItem Icon={Users}>Thành viên</RoomSettingItem>
                </ViewMemberDialog>
                <ViewInviteLinkDialog>
                    <RoomSettingItem Icon={UserRoundPlus}>
                        Mời thành viên
                    </RoomSettingItem>
                </ViewInviteLinkDialog>
                <ThemeSettingDialog>
                    <RoomSettingItem Icon={Palette}>Giao diện</RoomSettingItem>
                </ThemeSettingDialog>
            </div>
            <Separator></Separator>
            <DeleteMessage></DeleteMessage>
            <LeaveRoom></LeaveRoom>
        </div>
    );
};

export default RoomSetting;
