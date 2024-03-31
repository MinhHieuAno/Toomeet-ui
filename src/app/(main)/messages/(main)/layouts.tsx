import ChatList from "@/components/chat/ChatList";
import ChatSearch from "@/components/chat/ChatSearch";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import SoketConnectWrapper from "@/components/wrappers/SoketConnectWrapper";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return { children };
};

export default layout;
