"use client";
import { useAuth } from "@/context/AuthProvider";
import api from "@/lib/api";
import { GroupPrivacy } from "@/lib/group.utils";
import { getUsername } from "@/lib/utils";
import { createGroupSchema } from "@/schema/group.schema";
import FormData from "form-data";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import * as z from "zod";
import InputImage from "@/components/input/InputImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Role from "@/components/ui/role";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import { useToast } from "@/components/ui/use-toast";
type Props = {};

const CreateGroupForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const form = useFormContext<z.infer<typeof createGroupSchema>>();

    const { account } = useAuth();

    const router = useRouter();

    const { toast } = useToast();

    const onSubmit = async (value: z.infer<typeof createGroupSchema>) => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", value.name);
            formData.append("description", value.description);

            const images: ImageListType = value.background;

            const avatar = images[0];
            formData.append("avatar", avatar.file);

            const { data } = await api({
                method: "POST",
                url: "/group",
                data: formData,
            });
            router.replace(`/groups/${data.groupId}`);
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Tạo nhóm thất bại",
                description: error,
            });
        }
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form className="py-3 px-3" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-start items-center gap-4 my-4">
                    <Avatar>
                        <AvatarImage
                            loading={"lazy"}
                            src={
                                account?.user?.profile?.avatar?.url || undefined
                            }
                        ></AvatarImage>
                        <AvatarFallback>
                            {getUsername(account?.user?.name || "")?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-start items-start">
                        <p className="text-lg text-pretty max-w-full line-clamp-1">
                            {account?.user.name}
                        </p>
                        <Role>Quản trị viên</Role>
                    </div>
                </div>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên nhóm</FormLabel>
                                <FormControl {...field}>
                                    <Input
                                        placeholder="Tên nhóm"
                                        className="px-5 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quyền riêng tư</FormLabel>
                                <FormControl {...field}>
                                    <Select
                                        onValueChange={(value) =>
                                            form.setValue("privacy", +value)
                                        }
                                        {...field}
                                        value={JSON.stringify(field.value)}
                                        defaultValue={JSON.stringify(
                                            field.value
                                        )}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Phạm vi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {/* <SelectItem
                                                    value={GroupPrivacy.PRIVATE.toString()}
                                                >
                                                    Riêng tư
                                                </SelectItem> */}
                                                <SelectItem
                                                    value={GroupPrivacy.PUBLIC.toString()}
                                                >
                                                    Công khai
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả nhóm</FormLabel>
                                <FormControl {...field}>
                                    <TextArea
                                        placeholder="Mô tả nhóm"
                                        className="px-5 py-5 max-h-48 min-h-32"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="background"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chọn ảnh nền:</FormLabel>
                                <FormControl {...field}>
                                    <InputImage
                                        className="block"
                                        multiple={false}
                                        onSave={(image: ImageListType) => {
                                            form.setValue("background", image);
                                        }}
                                    >
                                        <Button
                                            type="button"
                                            size="icon"
                                            className="text-blue-500 bg-current/30 hover:text-white flex justify-center items-center"
                                        >
                                            <ImagePlus
                                                size="icon"
                                                className=" w-5 h-5"
                                            />
                                        </Button>
                                    </InputImage>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full my-5"
                >
                    {loading ? "Đang tạo nhóm" : "Tạo"}
                </Button>
            </form>
        </Form>
    );
};

export default CreateGroupForm;
