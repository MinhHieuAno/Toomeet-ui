import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import Logo from "@/components/ui/Logo";
import React from "react";

type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

const page = (props: Props) => {
    const searchParams = props.searchParams;
    const resetToken = searchParams["reset_token"] as string | undefined;

    if (!resetToken) {
        throw new Error("Liên kết đặt lại mật khẩu không hợp lệ");
    }

    return (
        <div className="p-6">
            <Logo size="md"></Logo>
            <div className="my-10  space-y-5 m-auto lg:max-w-[60%] ">
                <div className=" w-full text-left leading-loose">
                    <h1 className="text-3xl font-semibold">Đặt lại mật khẩu</h1>
                </div>
                <ResetPasswordForm resetToken={resetToken}></ResetPasswordForm>
            </div>
        </div>
    );
};

export default page;
