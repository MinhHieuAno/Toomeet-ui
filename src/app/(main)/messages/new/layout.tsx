import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import ButtonBack from "@/components/button/ButtonBack";
import { CreateChatRoomProvider } from "@/context/CreateChatRoomProvider";
import { ArrowLeft } from "lucide-react";
import CreatChatRoomForm from "@/components/form/CreateChatRoomForm";
import Sidebar from "@/components/sidebar/Sidebar";
import { Metadata } from "next";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
    return (
        <>
            <CreateChatRoomProvider>
                <Sidebar className="col-start-1 col-end-3">
                    <SidebarBlock fullScreen className="p-5">
                        <ButtonBack variant="secondary" size="icon">
                            <ArrowLeft className="w-5 h-5"></ArrowLeft>
                        </ButtonBack>
                        <CreatChatRoomForm></CreatChatRoomForm>
                    </SidebarBlock>
                </Sidebar>
                <Card className="my-2 col-start-3 col-end-9">{children}</Card>
            </CreateChatRoomProvider>
        </>
    );
};

export default layout;
