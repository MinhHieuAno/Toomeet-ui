"use client";
import { CommentType, Post } from "@/lib/post.utils";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";

type CommentProviderProps = {
    children: React.ReactNode;
};
interface ICommentContext {
    replyComment: CommentType | null;
    setReplyComment: Dispatch<SetStateAction<CommentType | null>>;
}

const CommentContext = React.createContext<ICommentContext | null>(null);

const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
    const [replyComment, setReplyComment] = useState<CommentType | null>(null);

    const values = { replyComment, setReplyComment };

    return (
        <CommentContext.Provider value={values}>
            {children}
        </CommentContext.Provider>
    );
};

const useComment = () => {
    const context = useContext(CommentContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useComment must be used within CommentProvider");
    }
    return context;
};

export { CommentProvider, useComment };
