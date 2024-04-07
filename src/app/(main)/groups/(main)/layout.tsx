import GroupSidebar from "@/components/group/GroupSidebar";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
    return (
        <div className="md:grid md:grid-cols-10">
            <GroupSidebar className="col-start-1 col-end-3"></GroupSidebar>
            <div className="col-start-3 col-end-11 py-5 px-3">{children}</div>
        </div>
    );
};

export default layout;
