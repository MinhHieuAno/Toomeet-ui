import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

const colors: string[] = [
    "#7e22ce",
    "#7c3aed",
    "#4338ca",
    "#4f46e5",
    "#2563eb",
    "#0ea5e9",
    "#2dd4bf",
    "#facc15",
    "#f59e0b",
    "#dc2626",
    "#ef4444",
    "#14b8a6",
    "#4f46e5",
    "#e11d48",
    "#fecdd3",
];

type Props = {
    value: string;
    onChange: (color: string) => void;
};

const ColorPicker = ({ value, onChange }: Props) => {
    const [color, setColor] = useState<string>(value);
    const [open, setOpen] = useState<boolean>(false);

    const handleChangeColor = (color: string) => {
        onChange(color);
        setColor(color);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
            <DropdownMenuTrigger asChild>
                <Button
                    className="p-5 block"
                    style={{ backgroundColor: color }}
                ></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="max-w-96 grid grid-cols-5 gap-2 p-2">
                    {colors.map((color) => (
                        <Button
                            onClick={() => handleChangeColor(color)}
                            className="bg-primary p-5 block"
                            key={color}
                            style={{ backgroundColor: color }}
                        ></Button>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ColorPicker;
