import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GroupProvider } from "@/context/GroupProvider";
import GroupBanner from "../../components/GroupBanner";
import CreatePostTrigger from "@/components/post/create/CreatePostTrigger";
import CreatePostFrom from "@/components/form/CreatePostFrom";
import GroupOverview from "../../components/GroupOverview";
import GroupFeed from "@/components/feed/GroupFeed";

type Props = { params: { id: string } };

const page = ({ params }: Props) => {
    return (
        <GroupProvider groupId={params.id}>
            <GroupBanner></GroupBanner>
            <div className="my-5 md:grid grid-cols-8 gap-5">
                <div className="col-start-1 col-end-7">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="">
                                <CreatePostTrigger></CreatePostTrigger>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="min-w-min ">
                            <CreatePostFrom
                                url={`group/${params.id}/post`}
                            ></CreatePostFrom>
                        </DialogContent>
                    </Dialog>
                    <GroupFeed
                        className="md:max-w-[80%] mx-auto"
                        groupId={params.id}
                    ></GroupFeed>
                </div>
                <GroupOverview className="transition-all col-start-7 col-end-9 md:sticky  h-min top-[120px] p-5"></GroupOverview>
            </div>
        </GroupProvider>
    );
};

export default page;
