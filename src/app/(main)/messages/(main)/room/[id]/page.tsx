import ChatRoom from "@/components/chat/room/ChatRoom";
import { Card } from "@/components/ui/card";

type Props = {};

const page = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <Card className="col-span-8">
                <ChatRoom chatId={parseInt(params.id)}></ChatRoom>
            </Card>
        </>
    );
};

export default page;
