import ButtonBack from "@/components/button/ButtonBack";
import CreatChatRoomForm from "@/components/form/CreateChatRoomForm";
import { Card } from "@/components/ui/card";
import { CreateChatRoomProvider } from "@/context/CreateChatRoomProvider";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
    const headerList = headers();
    const isDesktop = headerList.get("viewport") === "desktop";

    return (
        <>
            <CreateChatRoomProvider>
                <div className="xl:col-start-1 xl:col-end-3">
                    <Card className="p-5">
                        <ButtonBack
                            variant="secondary"
                            size="icon"
                            backUrl="/messages"
                        >
                            <ArrowLeft className="w-5 h-5"></ArrowLeft>
                        </ButtonBack>
                        <CreatChatRoomForm></CreatChatRoomForm>
                    </Card>
                </div>
                {isDesktop && (
                    <Card className="my-2 col-start-3 col-end-11">
                        {children}
                    </Card>
                )}
            </CreateChatRoomProvider>
        </>
    );
};

export default layout;
