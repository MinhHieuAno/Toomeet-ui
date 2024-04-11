import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    label: string;
    to: string;
    isAvtive?: boolean;
};

const ProfileNavVerticalItem = ({ isAvtive, label, to }: Props) => {
    return (
        <Link
            className={cn(
                "block w-full px-5 py-3 rounded-md transition-all hover:bg-primary/10 hover:text-primary font-semibold",
                {
                    " bg-primary/10 text-primary ": isAvtive,
                }
            )}
            href={to}
        >
            {label}
        </Link>
    );
};

export default ProfileNavVerticalItem;
