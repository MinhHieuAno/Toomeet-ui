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
import { ReactNode, useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useViewport } from "@/context/ViewportProvider";

type Props = {
    className?: string;
};

const Navbar = ({ className }: Props) => {
    const pathname = usePathname();
    const { viewport } = useViewport();

    const isMobile = useMemo(() => viewport === "mobile", [viewport]);

    return (
        <nav className={cn(" flex justify-center items-center ", className)}>
            <NavItem active={pathname === "/"} label="Trang chủ" to="/">
                <Home />
            </NavItem>
            <NavItem
                label="Bạn bè"
                to="/friends/suggestions"
                active={pathname.startsWith("/friends")}
            >
                <UserRound />
            </NavItem>

            <NavItem
                className="flex xl:hidden"
                label="Tìm kiếm"
                to="/search"
                active={pathname.startsWith("/search")}
            >
                <Search />
            </NavItem>

            <NavItem
                label="Nhóm"
                to={isMobile ? "/groups" : "/groups/discover"}
                active={pathname.startsWith("/groups")}
            >
                <Users />
            </NavItem>

            <NavItem
                label="Cửa hàng"
                to="/store"
                active={pathname.startsWith("/store")}
            >
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
    active?: boolean;
};

const NavItem = ({
    label,
    to,
    children,
    className,
    active = false,
}: NavTiemProps) => {
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
                                    active,
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
