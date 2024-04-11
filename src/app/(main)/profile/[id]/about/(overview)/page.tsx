"use client";
import { useToast } from "@/components/ui/use-toast";
import { ProfileOverviewType } from "@/lib/profile.utils";
import { sleep } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ProfileInfoGroup from "../../../components/ProfileInfoGroup";
import ProfileInfoItem from "../../../components/ProfileInfoItem";

type Props = {};

const page = (props: Props) => {
    const [profileOverview, setProfileOverview] =
        useState<ProfileOverviewType>();

    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await sleep(2000);
                setProfileOverview({
                    address: "Không có thông tin",
                    education: "Không có thông tin",
                    email: "Không có thông tin",
                    phone: "Không có thông tin",
                    workplace: "Không có thông tin",
                });
            } catch (error) {
                console.log(error);
                toast({
                    title: "Lỗi",
                    description: "Tải thông tin thất bại",
                });
            }
            setLoading(false);
        })();
    }, []);

    return (
        <div className="w-full h-full p-5">
            <ProfileInfoGroup title="Thông tin cơ bản" loading={loading}>
                {profileOverview?.workplace && (
                    <ProfileInfoItem
                        title="Làm việc tại: "
                        content={profileOverview.workplace}
                    />
                )}

                {profileOverview?.education && (
                    <ProfileInfoItem
                        title="Học vấn: "
                        content={profileOverview?.education}
                    />
                )}

                {profileOverview?.address && (
                    <ProfileInfoItem
                        title="Sống tại: "
                        content={profileOverview?.address}
                    />
                )}
            </ProfileInfoGroup>
        </div>
    );
};

export default page;
