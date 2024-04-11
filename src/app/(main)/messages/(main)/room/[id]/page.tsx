import ChatRoom from "@/app/(main)/messages/components/room/ChatRoom";
import { Card } from "@/components/ui/card";

type Props = { params: { id: string } };

const page = ({ params }: Props) => {
    return (
        <>
            <Card className="col-span-8">
                <ChatRoom chatId={parseInt(params.id)}></ChatRoom>
            </Card>
        </>
    );
};

export default page;
