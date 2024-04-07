import React from "react";

type Props = {
    title: string;
    content: string;
};

const ProfileInfoItem = ({ title, content }: Props) => {
    return (
        <div className="flex justify-start items-center gap-2">
            <h4 className="font-semibold text-xl">{title}</h4>
            <p className="text-lg font-medium">{content}</p>
        </div>
    );
};

export default ProfileInfoItem;
