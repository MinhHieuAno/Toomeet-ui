import { Card } from "@/components/ui/card";
import { headers } from "next/headers";
import ChatSidebar from "../../components/ChatSidebar";

type Props = {};

const page = (props: Props) => {
    const headerList = headers();
    const isMobile = headerList.get("viewport") === "mobile";

    return (
        <>
            <ChatSidebar></ChatSidebar>
            {!isMobile && (
                <Card className="col-span-8">
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="w-96 h-96">
                            <img
                                src="/nothing.svg"
                                alt="nothing"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h2 className="text-center text-muted-foreground">
                            Chưa có đoạn chat nào được chọn
                        </h2>
                    </div>
                </Card>
            )}
        </>
    );
};
export default page;
