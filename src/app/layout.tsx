import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ViewportProvider } from "@/context/ViewportProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SocketProvider } from "@/context/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default:
            "TooMeet - Mạng xã hội sinh viên - Kết nối, chia sẻ và phát triển",
        template:
            "%s | TooMeet - Mạng xã hội sinh viên - Kết nối, chia sẻ và phát triển",
    },
    description: `Mạng xã hội dành riêng cho sinh viên. Nơi kết nối, chia sẻ thông tin, học tập và phát triển cùng cộng đồng sinh viên năng động, sáng tạo.`,
    keywords: [
        "TooMeet",
        "Mạng xã hội Toomeet",
        "Mạng xã hội sinh viên",
        "Mạng xã hội TDMU",
        "Kết nối sinh viên TDMU",
        "Chia sẻ thông tin sinh viên",
        "Học tập và phát triển sinh viên",
        "Cộng đồng sinh viên TDMU",
        "Sinh viên TDMU",
        "Trường đại học Thủ Dầu Một",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headerList = headers();
    const viewport = headerList.get("viewport");
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ViewportProvider viewport={viewport as any}>
                        <AuthProvider>
                            <SocketProvider>
                                <div className="bg-primary/0">{children}</div>
                            </SocketProvider>
                        </AuthProvider>
                    </ViewportProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
