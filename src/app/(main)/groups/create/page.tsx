import ButtonBack from "@/components/button/ButtonBack";
import CreateGroupForm from "@/components/form/CreateGroupForm";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import { CreateGroupProvider } from "@/context/CreateGroupProvider";
import { ArrowLeft } from "lucide-react";
import CreateGroupPreview from "../components/CreateGroupPreview";

type Props = {};

const page = (props: Props) => {
    return (
        <CreateGroupProvider>
            <div className="md:grid md:grid-cols-10">
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
                <div className="hidden md:block col-start-3 col-end-11 py-5">
                    <CreateGroupPreview></CreateGroupPreview>
                </div>
            </div>
        </CreateGroupProvider>
    );
};

export default page;
