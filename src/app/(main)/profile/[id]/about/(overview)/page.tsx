"use client";
import ProfileInfoGroup from "@/components/profile/ProfileInfoGroup";
import ProfileInfoItem from "@/components/profile/ProfileInfoItem";
import { useToast } from "@/components/ui/use-toast";
import { ProfileOverviewType } from "@/lib/profile.utils";
import { sleep } from "@/lib/utils";
import React, { useEffect, useState } from "react";

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
                    address: "Tân Uyên, Bính Dương",
                    education: "TDMU",
                    email: "hieu@gmail.com",
                    phone: "0932251521",
                    workplace: "Tân Uyên, Bính Dương",
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
