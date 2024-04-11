"use client";
import React, { ReactNode, useState } from "react";
import { Switch } from "@/components/ui/switch";

type Props = {
    onActive: () => Promise<boolean> | boolean;
    onDeactive: () => Promise<boolean> | boolean;
    children: ReactNode;
    defaultValue?: boolean;
};

const SettingSwitchItem = ({
    children,
    defaultValue = false,
    onActive,
    onDeactive,
}: Props) => {
    const [active, setActive] = useState<boolean>(defaultValue);

    const handleActive = async () => {
        const success = await onActive();
        if (success) setActive(true);
    };

    const handleDeactive = async () => {
        const success = await onDeactive();
        if (success) setActive(false);
    };

    const handleToggle = async () => {
        if (active) handleDeactive();
        else handleActive();
    };

    return (
        <div
            onClick={handleToggle}
            className="flex justify-between items-center gap-2 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900"
        >
            <p className="text-base font-medium">{children}</p>
            <Switch checked={active}></Switch>
        </div>
    );
};

export default SettingSwitchItem;
