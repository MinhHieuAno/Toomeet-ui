import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
import Logo from "@/components/ui/Logo";
import React from "react";

type Props = {};

const page = (props: Props) => {
    return (
        <div className="p-6">
            <Logo size="md"></Logo>
            <div className="my-10  space-y-5 m-auto lg:max-w-[60%] ">
                <div className=" w-full text-left leading-loose">
                    <h1 className="text-3xl font-semibold">Quên mật khẩu</h1>
                </div>
                <ForgotPasswordForm></ForgotPasswordForm>
            </div>
        </div>
    );
};

export default page;
