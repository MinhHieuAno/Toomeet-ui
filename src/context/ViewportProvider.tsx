"use client";
import React, { useContext } from "react";

type Viewport = "mobile" | "desktop";
type ViewportProviderProps = {
    children: React.ReactNode;
    viewport: Viewport;
};

interface IViewportContext {
    viewport: Viewport;
}

const ViewportContext = React.createContext<IViewportContext | null>(null);

const ViewportProvider: React.FC<ViewportProviderProps> = ({
    children,
    viewport,
}) => {
    const values = { viewport };

    return (
        <ViewportContext.Provider value={values}>
            {children}
        </ViewportContext.Provider>
    );
};

const useViewport = () => {
    const context = useContext(ViewportContext);
    if (typeof context === "undefined" || !context) {
        throw new Error("useViewport must be used within ViewportProvider");
    }
    return context;
};

export { ViewportProvider, useViewport };
