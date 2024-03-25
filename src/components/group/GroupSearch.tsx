import React from "react";
import { Input } from "../ui/input";

type Props = {};

const GroupSearch = (props: Props) => {
    return (
        <div className="my-3">
            <Input placeholder="Tìm kiếm"></Input>
        </div>
    );
};

export default GroupSearch;
