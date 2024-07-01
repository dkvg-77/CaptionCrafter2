import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#060606e8] text-white`}>
        <main className="p-4 max-w-3xl mx-auto">
          <header className="flex justify-center my-8 ">
            <Link href="/" className="text-5xl font-serif">
              Caption Crafter
            </Link>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
