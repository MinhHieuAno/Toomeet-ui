import ButtonBack from "@/components/button/ButtonBack";
import PostManage from "../../../components/PostManage";

type Props = {
    params: { id: string };
};

const page = ({ params }: Props) => {
    return (
        <div>
            <div className="w-full h-full flex justify-start">
                <ButtonBack></ButtonBack>
            </div>
            <h1 className="my-5 text-xl md:text-2xl font-semibold text-muted-foreground">
                {" "}
                Quản lý nhóm
            </h1>
            <div>
                <h2 className="mb-5 text-lg font-semibold text-muted-foreground">
                    Bài viết
                </h2>
                <PostManage groupId={params.id}></PostManage>
            </div>
        </div>
    );
};

export default page;
