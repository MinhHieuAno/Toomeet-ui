"use client";
import { useState } from "react";
import { Button } from "../ui/button";

const ToggleContent = ({
    content,
    maxLength = 200,
}: {
    content: string;
    maxLength?: number;
}) => {
    const [open, setOpen] = useState<boolean>(
        () => content.length <= maxLength
    );

    if (content === "null" || content === "" || content === null) return <></>;

    return (
        <h5 className="text-sm md:text-lg my-4 text-pretty">
            {content.length > 200 ? (
                <>
                    {content.slice(0, open ? content.length : maxLength)}
                    <Button
                        onClick={() => setOpen((open) => !open)}
                        variant="link"
                        size="sm"
                    >
                        {open ? "Ẩn" : "Xem thêm"}
                    </Button>
                </>
            ) : (
                content
            )}
        </h5>
    );
};

export default ToggleContent;
