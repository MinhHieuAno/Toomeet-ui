import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default:
            "Toomeet - Nơi kết nối, chia sẻ thông tin, học tập và phát triển cùng cộng đồng sinh viên năng động, sáng tạo.",
        template:
            "%s - Toomeet | Mạng xã hội sinh viên - Kết nối, chia sẻ và phát triển",
    },
    description: `Mạng xã hội dành riêng cho sinh viên. Nơi kết nối, chia sẻ thông tin, học tập và phát triển cùng cộng đồng sinh viên năng động, sáng tạo.`,
    keywords: [
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
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <Header></Header>
                        <div className="bg-primary/0">{children}</div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
