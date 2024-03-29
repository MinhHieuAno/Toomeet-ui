"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Single_Day } from "next/font/google";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const singleDay = Single_Day({ weight: "400" });

export default function Notfound({}) {
    const pathname = usePathname();

    const router = useRouter();
    return (
        <div
            className={cn(
                singleDay.className,
                "w-svw h-svh flex justify-start items-center flex-col gap-5 p-5 mt-6"
            )}
        >
            <h1 className={cn(singleDay.className, "text-6xl font-semibold")}>
                404
            </h1>
            <p className={cn("text-4xl font-semibold my-5 text-center")}>
                Bạn đang đi đâu?
            </p>
            <Image
                width={400}
                height={400}
                src="/not-found.svg"
                alt="notfound"
                style={{ objectFit: "cover" }}
            ></Image>
            <h2 className="text-muted-foreground texwindow.location.pathnamet-lg">
                Không tìm thấy địa chỉ {pathname}
            </h2>
            <div className="flex justify-center items-center gap-5">
                <Button
                    onClick={() => router.back()}
                    className="font-semibold text-lg"
                    variant="secondary"
                >
                    Quay lại
                </Button>
                <Button
                    onClick={() => router.push("/")}
                    className="font-semibold text-lg"
                >
                    Trang chủ
                </Button>
            </div>
        </div>
    );
}
