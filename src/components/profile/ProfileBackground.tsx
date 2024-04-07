"use client";
import React from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import InputImage from "../input/InputImage";
import { useAuth } from "@/context/AuthProvider";

type Props = {};

const ProfileBackground = (props: Props) => {
    const { account } = useAuth();
    const handleSaveBackground = async () => {};

    return (
        <div className="relative w-full h-[240px] md:h-[300px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            <div className="abs-center w-full h-full bg-black/50"></div>
            <img
                className="w-full h-full object-cover rounded-[inherit]"
                src={account?.user?.profile?.background?.url}
                alt="background"
            />
            <div className="absolute bottom-5 right-5">
                <InputImage onSave={handleSaveBackground} multiple={false}>
                    <Button variant="secondary" size="icon">
                        <Edit></Edit>
                    </Button>
                </InputImage>
            </div>
        </div>
    );
};

export default ProfileBackground;
