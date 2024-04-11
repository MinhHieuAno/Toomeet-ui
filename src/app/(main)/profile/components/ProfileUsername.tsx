"use client";
import { useProfile } from "@/context/ProfileProvider";

type Props = {};

const ProfileUsername = (props: Props) => {
    const { profile } = useProfile();
    return (
        <div>
            <h2 className="text-2xl md:text-3xl  font-semibold">
                {profile?.name}
            </h2>
        </div>
    );
};

export default ProfileUsername;
