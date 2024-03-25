import { Metadata } from "next";
import JoinRoomCard from "./JoinRoomCard";
type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const roomName = searchParams["name"] as string;
    return {
        title: `Lời mời tham gia phòng ${roomName}`,
        openGraph: {
            description: `Lời mời tham gia phòng ${roomName}`,
        },
    };
}

const page = ({ searchParams }: Props) => {
    const roomName = searchParams["name"] as string;
    const roomAvatar = searchParams["avatar"] as string;
    const token = searchParams["token"] as string;
    const roomId = searchParams["room"] as string;
    if (!roomName || !roomAvatar || !token || !roomId) {
        throw new Error("Lời mời không hợp lệ");
    }

    return (
        <div className="w-full py-10 flex justify-center items-center">
            <JoinRoomCard
                token={token}
                roomName={roomName}
                roomAvatar={roomAvatar}
                roomId={roomId}
            ></JoinRoomCard>
        </div>
    );
};

export default page;
