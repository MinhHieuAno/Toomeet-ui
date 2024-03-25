import ButtonBack from "@/components/button/ButtonBack";
import CreateGroupForm from "@/components/form/CreateGroupForm";
import GroupPreview from "@/components/group/CreateGroupPreview";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { Button } from "@/components/ui/button";
import { CreateGroupProvider } from "@/context/CreateGroupProvider";
import { ArrowLeft } from "lucide-react";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <CreateGroupProvider>
            <Sidebar className="col-start-1 col-end-3">
                <SidebarBlock
                    fullScreen
                    header={
                        <div className="flex justify-start items-center gap-2 px-5 py-4">
                            <ButtonBack variant="secondary" size="icon">
                                <ArrowLeft className="w-5 h-5"></ArrowLeft>
                            </ButtonBack>
                            <h1 className="flex-1 text-center text-lg font-semibold text-muted-foreground">
                                Tạo nhóm
                            </h1>
                        </div>
                    }
                >
                    <CreateGroupForm></CreateGroupForm>
                </SidebarBlock>
            </Sidebar>
            <div className="col-start-3 col-end-9 py-5">
                <GroupPreview></GroupPreview>
            </div>
        </CreateGroupProvider>
    );
};

export default page;
