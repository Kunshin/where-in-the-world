import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Frontend Mentor | Where in the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-very-light-gray text-very-dark-blue dark:bg-very-dark-blue-bg dark:text-white font-nunito">
        {children}
      </body>
    </html>
  )
}