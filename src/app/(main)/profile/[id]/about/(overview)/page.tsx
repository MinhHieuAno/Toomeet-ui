"use client";
import { useToast } from "@/components/ui/use-toast";
import { sleep } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type Props = {};

type ProfileOverviewType = {
    workplace: string | null;
    eduaction: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
};

const page = (props: Props) => {
    const [profileOverview, setProfileOverview] =
        useState<ProfileOverviewType>();

    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                // await sleep(2000);
                setProfileOverview({
                    address: "Tân Uyên, Bính Dương",
                    eduaction: "TDMU",
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
        <div className="p-5">
            {profileOverview?.workplace && (
                <div className="flex justify-start gap-2 text-lg">
                    <h4 className="font-semibold text-xl">Làm việc tại:</h4>
                    <p>{profileOverview?.workplace}</p>
                </div>
            )}

            {profileOverview?.eduaction && (
                <div className="flex justify-start gap-2 text-lg">
                    <h4 className="font-semibold text-lg">Học vấn:</h4>
                    <p>{profileOverview?.eduaction}</p>
                </div>
            )}

            {profileOverview?.address && (
                <div className="flex justify-start gap-2 text-lg">
                    <h4 className="font-semibold text-lg">Sống tại:</h4>
                    <p>{profileOverview?.address}</p>
                </div>
            )}

            {profileOverview?.address && (
                <div className="flex justify-start gap-2 text-lg">
                    <h4 className="font-semibold">Địa chỉ:</h4>
                    <p>{profileOverview?.address}</p>
                </div>
            )}
        </div>
    );
};

export default page;
