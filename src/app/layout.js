import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistmono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "SuffX Dashboard",
  description: "Main page for the SuffX Dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-slate-900">
      <body className={`${geistmono.className}`}>
        {children}
      </body>
    </html>
  );
}
