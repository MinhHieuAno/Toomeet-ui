import Sidebar from "@/components/sidebar/Sidebar";
import SidebarBlock from "@/components/sidebar/SidebarBlock";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { FC, ReactNode } from "react";
import NewEven from "../../modules/home/NewEven";
import RecommendFriend from "../../modules/home/RecommendFriend";
import RecommendGroup from "../../modules/home/RecommendGroup";
import FriendOnlineList from "./FriendOnlineList";

type Props = {
    children: ReactNode;
};

const layout: FC<Props> = ({ children }) => {
    return (
        <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12  gap-2">
            <Sidebar className="hidden xl:block col-start-1 col-end-4 ">
                <SidebarBlock title="Sự kiện nổi bật">
                    <NewEven></NewEven>
                </SidebarBlock>
                <SidebarBlock title="Bạn có thể biết">
                    <RecommendFriend></RecommendFriend>
                </SidebarBlock>
                <SidebarBlock title="Bạn có thể quan tâm">
                    <RecommendGroup></RecommendGroup>
                </SidebarBlock>
            </Sidebar>
            <div className="col-start-1 col-end-7 xl:col-start-4 xl:col-end-10 my-10 mx-0 2xl:mx-16">
                {children}
            </div>
            <Sidebar className="col-start-10 col-end-13  hidden xl:block ">
                <SidebarBlock
                    title="Quảng cáo"
                    className="flex justify-center items-center"
                >
                    <div className="w-full flex justify-center items-center h-[180px]">
                        <img
                            className="w-full h-full object-cover"
                            src="https://i.pinimg.com/originals/c9/e1/c6/c9e1c63a11edd6c12ad7576862e41d74.gif"
                            alt=""
                        />
                    </div>
                </SidebarBlock>
                <SidebarBlock
                    header={
                        <h3 className=" px-5 py-3 text-primary font-semibold">
                            Bạn bè đang hoạt động
                        </h3>
                    }
                    className="h-full p-5 flex justify-center items-center flex-col"
                >
                    <FriendOnlineList></FriendOnlineList>
                </SidebarBlock>
            </Sidebar>
        </MaxWidthWrapper>
    );
};

export default layout;
