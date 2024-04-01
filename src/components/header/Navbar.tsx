"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Home, Search, Store, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";

type Props = {
    className?: string;
};

const Navbar = ({ className }: Props) => {
    return (
        <nav className={cn(" flex justify-center items-center ", className)}>
            <NavItem label="Trang chủ" to="/">
                <Home />
            </NavItem>
            <NavItem label="Bạn bè" to="/friends/suggestions">
                <UserRound />
            </NavItem>

            <NavItem className="flex xl:hidden" label="Tìm kiếm" to="/search">
                <Search />
            </NavItem>

            <NavItem label="Nhóm" to="/groups">
                <Users />
            </NavItem>

            <NavItem label="Cửa hàng" to="/store">
                <Store />
            </NavItem>
        </nav>
    );
};

type NavTiemProps = {
    label: string;
    to: string;
    children: ReactNode;
    className?: string;
};

const NavItem = ({ label, to, children, className }: NavTiemProps) => {
    const pathname = usePathname();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "flex-1 flex-shrink-0 font-semibold hover:text-primary text-muted-foreground cursor-pointer",
                            {
                                "text-primary relative before:absolute before:-bottom-2 before:left-0 before:h-[2px] before:w-full before:bg-primary ":
                                    pathname === to,
                            },
                            className
                        )}
                        href={to}
                    >
                        {children}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Navbar;
