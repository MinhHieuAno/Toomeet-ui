"use client";
import Logo from "@/components/ui/Logo";
import { useTheme } from "next-themes";
import GlobalSearch from "../search/GlobalSearch";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import HeaderAction from "./HeaderAction";
import Navbar from "./Navbar";

type Props = {};

const Header = (props: Props) => {
    const { setTheme, theme } = useTheme();
    return (
        <>
            {/* <div className="hidden 2xl:block ">2xl</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden lg:block xl:hidden">lg</div>
            <div className="hidden md:block lg:hidden">md</div>
            <div className="hidden sm:block md:hidden">sm</div>
            <div className="sm:hidden">mobile</div> */}

            <header className="shadow-1 bg-white dark:bg-slate-900 backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
                <MaxWidthWrapper className=" grid grid-cols-12 gap-2 items-center">
                    <Logo className="p-5 col-start-1 col-end-2"></Logo>
                    <GlobalSearch className="hidden md:flex col-start-2 col-end-4"></GlobalSearch>
                    <Navbar className="hidden md:flex bottom-0 col-start-4 col-end-10 mx-0 2xl:mx-16"></Navbar>
                    <HeaderAction className=" col-start-10 col-end-13"></HeaderAction>
                </MaxWidthWrapper>
            </header>
            <Navbar className="fixed md:hidden -bottom-[8px] p-3 pb-5 w-svw left-[50%] -translate-x-[50%] dark:bg-slate-900 z-50 bg-white da col-start-4 col-end-10 mx-0 2xl:mx-16 shadow-xl border-t"></Navbar>
        </>
    );
};

export default Header;
