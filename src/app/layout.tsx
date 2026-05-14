import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header />
        <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 tablet:px-6 pc:px-0 py-6 tablet:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
