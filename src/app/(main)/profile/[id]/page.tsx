import Timeline from "@/components/feed/Timeline";
import ProfileOverviewCard from "../components/ProfileOverviewCard";

type Props = {
    params: { id: string };
};

const page = ({ params }: Props) => {
    return (
        <div className="w-full min-h-[100svh] xl:grid xl:grid-cols-10 grid-cols-1 gap-2">
            <ProfileOverviewCard></ProfileOverviewCard>
            <div className=" col-span-6 h-full">
                <Timeline profileId={parseInt(params.id)}></Timeline>
            </div>
        </div>
    );
};

export default page;
