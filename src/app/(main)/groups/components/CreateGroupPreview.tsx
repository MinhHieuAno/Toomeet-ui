"use client";
import CreatePostTrigger from "@/components/post/create/CreatePostTrigger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GroupPrivacy } from "@/lib/group.utils";
import { cn } from "@/lib/utils";
import { createGroupSchema } from "@/schema/group.schema";
import { Globe2, Lock, Monitor, Tablet } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";

type Props = {};

const CreateGroupPreview = (props: Props) => {
    const [deviceType, setDeviceType] = useState<"mobile" | "desktop">(
        "desktop"
    );

    const { watch } = useFormContext<z.infer<typeof createGroupSchema>>();

    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <div
                className={cn(" w-full h-full transition-all", {
                    "w-[496px]": deviceType === "mobile",
                })}
            >
                <div className="absolute top-2 right-2 flex justify-end items-center gap-2 p-2 rounded-md bg-white backdrop-blur-md bg-opacity-30 z-30">
                    <Button
                        onClick={() => setDeviceType("mobile")}
                        size="icon"
                        variant={
                            deviceType === "mobile" ? "default" : "outline"
                        }
                    >
                        <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => setDeviceType("desktop")}
                        size="icon"
                        variant={
                            deviceType === "desktop" ? "default" : "outline"
                        }
                    >
                        <Monitor className="w-4 h-4" />
                    </Button>
                </div>
                <Card className="w-full overflow-hidden p-5">
                    <div className="w-full h-[300px] rounded-xl  backdrop-blur-md bg-opacity-30">
                        {watch("background")?.[0]?.data_url ? (
                            <img
                                className="h-full w-full object-cover object-center rounded-[inherit]"
                                src={watch("background")?.[0]?.data_url}
                                alt=""
                            />
                        ) : (
                            <div className="flex justify-center items-center w-full h-full">
                                <p className="text-primary font-semibold">
                                    Chưa có ảnh nền
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="my-5 space-y-3">
                        <h3
                            className={cn(
                                "text-2xl font-semibold text-muted-foreground text-pretty ",
                                {
                                    " line-clamp-2 max-w-fit":
                                        deviceType === "desktop",
                                    " line-clamp-4 ": deviceType === "mobile",
                                }
                            )}
                        >
                            {watch("name") || "Tên nhóm"}
                        </h3>
                        <span className="flex justify-start items-center gap-2 text-muted-foreground font-semibold text-xs">
                            {watch("privacy") === GroupPrivacy.PUBLIC && (
                                <>
                                    <Globe2 className="w-4 h-4" /> nhóm công
                                    khai - 1 thành viên
                                </>
                            )}
                            {watch("privacy") === GroupPrivacy.PRIVATE && (
                                <>
                                    <Lock className="w-4 h-4" /> nhóm riêng tư -
                                    1 thành viên
                                </>
                            )}
                        </span>
                    </div>

                    {/* <Separator></Separator>
                    <div className="flex  justify-start items-center mt-5">
                        <Button variant="ghost">Giới thiệu</Button>
                        <Button variant="ghost">Bài viết</Button>
                        <Button variant="ghost">Thành viên</Button>
                        <Button variant="ghost">Sự kiện</Button>
                    </div> */}
                </Card>
                <div
                    className={cn("w-full grid grid-cols-6 mt-5  gap-5", {
                        "grid-rows-2": deviceType === "mobile",
                    })}
                >
                    <CreatePostTrigger
                        className={cn("transition-all", {
                            "col-span-4": deviceType === "desktop",
                            "col-span-6 row-start": deviceType === "mobile",
                        })}
                    ></CreatePostTrigger>
                    <Card
                        className={cn("transition-all", {
                            "col-span-2 p-5": deviceType === "desktop",
                            "col-span-6 p-5": deviceType === "mobile",
                        })}
                    >
                        <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
                            Giới thiệu
                        </h2>
                        <p className="line-clamp-5 max-h-fit text-muted-foreground">
                            {watch("description") || "Mô tả nhóm."}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupPreview;
