"use client";
import "@/app/reaction.css";
import {
    ReactionType,
    ReacttionItemType,
    reactions,
} from "@/lib/reaction.utils";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Button, ButtonProps } from "./button";

type Props = {
    children: (
        activeReaction: ReacttionItemType | null,
        onToggleReaction: () => void
    ) => React.ReactNode;
    onActiveReaction: (value: number) => void;
    onDeactiveReaction: () => void;
    initialReaction: ReactionType | undefined;
    position?: "top" | "right" | "left" | "bottom" | "top-left" | "top-right";
    size?: "xs" | "sm" | "md" | "lg";
    showRemove?: boolean;
};

interface IReactionContext {}

const ReactionContext = React.createContext<IReactionContext | null>(null);

const Reaction: React.FC<Props> = ({
    children,
    onActiveReaction,
    onDeactiveReaction,
    initialReaction,
    position = "top-left",
    size = "md",
    showRemove = false,
}) => {
    const [activeReaction, setActiveReaciton] =
        useState<ReacttionItemType | null>(() => {
            return (
                reactions.find((item) => item.value === initialReaction) || null
            );
        });

    const handleClickAciton = (reaction: ReacttionItemType) => {
        onActiveReaction(reaction.value);
        setActiveReaciton(reaction);
    };

    const handleToggleReaction = () => {
        if (activeReaction === null) {
            // active
            const defaultReaction = reactions[0];
            setActiveReaciton(defaultReaction);
            onActiveReaction(defaultReaction.value);
        } else {
            //deactive
            onDeactiveReaction();
            setActiveReaciton(null);
        }
    };

    const values = {};

    return (
        <ReactionContext.Provider value={values}>
            <div className="reaction-wrapper">
                {children(activeReaction, handleToggleReaction)}
                <div
                    className={`reaction-box reaction-box--${position} reaction-box--${size}`}
                >
                    {reactions.map((reaction) => {
                        return (
                            <ReactionItem
                                onClick={() => handleClickAciton(reaction)}
                                key={reaction.value}
                                {...reaction}
                            ></ReactionItem>
                        );
                    })}
                    {showRemove && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                onDeactiveReaction();
                                setActiveReaciton(null);
                            }}
                        >
                            <X size={20}></X>
                        </Button>
                    )}
                </div>
            </div>
        </ReactionContext.Provider>
    );
};

type ReactionItemProps = {} & ReacttionItemType & ButtonProps;

const ReactionItem: React.FC<ReactionItemProps> = ({
    image,
    name,
    value,
    label,
    ...props
}) => {
    return (
        <button variant="ghost" className="reaction-item" {...props}>
            <img
                className="reaction-img"
                src={`/reactions/${image}`}
                alt={`reaction-${name}`}
            />
        </button>
    );
};

export { Reaction };
