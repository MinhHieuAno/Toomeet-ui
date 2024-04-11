"use client";
import SecuritySettingForm from "@/components/form/SecuritySettingForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthProvider";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import LoginHistoryList from "../components/LoginHistoryList";
import AccountSettingForm from "@/components/form/AccountSettingForm";
type Props = {};

const page = (props: Props) => {
    const { account } = useAuth();

    const hostName = useRef<string>("");

    useEffect(() => {
        hostName.current = location.host;
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-base md:text-lg font-semibold text-muted-foreground my-3">
                    Thông tin tài khoản
                </h2>
                <AccountSettingForm></AccountSettingForm>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="mt-5">
                            Mã QR của tôi
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[300px] h-[300px] p-5">
                        <QRCodeSVG
                            className="w-full h-auto"
                            value={`${
                                hostName.current || "http://toomeet.click"
                            }/profile/${account?.user.id}`}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <h2 className="text-base md:text-lg font-semibold text-muted-foreground my-3">
                    Bảo mật
                </h2>
                <SecuritySettingForm></SecuritySettingForm>
            </div>

            <div>
                <h2 className="text-base md:text-lg font-semibold text-muted-foreground my-3">
                    Lịch sử đăng nhập
                </h2>
                <LoginHistoryList></LoginHistoryList>
            </div>
        </div>
    );
};

export default page;
