import Header from "@/components/header/Header";
import { SocketProvider } from "@/context/SocketProvider";
import { ReactNode } from "react";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
};

export default layout;
