import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    className?: string;
};

const GlobalSearch = ({ className }: Props) => {
    return (
        <div
            className={cn("w-full flex justify-start items-center", className)}
        >
            <Button variant="ghost" className="xl:hidden mx-auto">
                <Search size={20}></Search>
            </Button>
            <Input
                placeholder="Tìm kiếm trên TooMeet"
                className="hidden xl:block"
            />
        </div>
    );
};

export default GlobalSearch;
