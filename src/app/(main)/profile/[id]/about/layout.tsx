import { Card } from "@/components/ui/card";
import React, { ReactNode } from "react";
import ProfileNavVertical from "../../components/ProfileNavVertical";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <Card className="p-5 my-5 md:grid grid-cols-12 min-h-96">
            <div className="col-span-3">
                <h1 className="text-xl font-semibold text-muted-foreground mb-5">
                    Giới thiệu
                </h1>
                <ProfileNavVertical></ProfileNavVertical>
            </div>
            <div className="col-span-9">{children}</div>
        </Card>
    );
};

export default layout;
