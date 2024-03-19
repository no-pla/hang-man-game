import type { Metadata } from "next";
import { Mouse_Memoirs } from "next/font/google";
import "./globals.css";

const mouseMemoirs = Mouse_Memoirs({
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Hangman Game",
  description: "play hangman game",
  keywords: ["행맨 게임", "단어 맞추기", "단어 퀴즈", "영어 단어 맞추기"],
  icons: "/favicon-32x32.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mouseMemoirs.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
