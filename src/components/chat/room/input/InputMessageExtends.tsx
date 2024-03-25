import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ImagePlus, Paperclip, PlusCircle, SmilePlus } from "lucide-react";
import SendMessageImage from "./SendMessageImage";
import InputExtendItem from "./InputExtendItem";
type Props = {};

const InputMessageExtends = (props: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <PlusCircle size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <SendMessageImage></SendMessageImage>
                    <InputExtendItem
                        icon={<SmilePlus className="w-5 h-5 text-yellow-500" />}
                        label="icon"
                    />
                    <InputExtendItem
                        icon={<Paperclip className="w-5 h-5 text-blue-500" />}
                        label="File"
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default InputMessageExtends;
