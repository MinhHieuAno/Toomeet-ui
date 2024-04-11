"use client";
import { useEffect, useState } from "react";
import SettingSwitchItem from "../../app/(main)/settings/components/SettingSwitchItem";
import { SecuritySetting } from "@/lib/setting.utils";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthProvider";

type Props = {};

const SecuritySettingForm = (props: Props) => {
    const [securitySetting, setSecuritySetting] = useState<SecuritySetting>({
        is2fa: false,
    });
    const { account } = useAuth();

    const { toast } = useToast();

    useEffect(() => {
        if (!account?.accountId) return;
        (async () => {
            try {
                const { data } = await api(`/users/account/settings/security`);
                setSecuritySetting(data);
            } catch (error: any) {
                toast({
                    title: "Tải cài đặt bảo mật thất bại",
                    description: error,
                });
            }
        })();
    }, [account?.accountId]);

    const handeActive2fa = async () => {
        try {
            await api({
                method: "PATCH",
                url: "/users/account/2fa/active",
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleDeactive = async () => {
        try {
            await api({
                method: "PATCH",
                url: "/users/account/2fa/de-active",
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div>
            <div>
                <SettingSwitchItem
                    defaultValue={securitySetting.is2fa}
                    onDeactive={handleDeactive}
                    onActive={handeActive2fa}
                >
                    Xác thực 2 bước
                </SettingSwitchItem>
            </div>
        </div>
    );
};

export default SecuritySettingForm;
