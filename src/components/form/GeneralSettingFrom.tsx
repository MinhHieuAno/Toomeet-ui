"use client";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import Comingsoon from "../ui/comingsoon";

type Props = {};

const GeneralSettingFrom = (props: Props) => {
    const form = useForm();

    return (
        <Form {...form}>
            <form action="">
                <Comingsoon></Comingsoon>
            </form>
        </Form>
    );
};

export default GeneralSettingFrom;
