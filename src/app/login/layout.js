import { Poppins } from "next/font/google";
import "../globals.css";

const fontFamilyName = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vision Quest",
  description: "Vision Quest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fontFamilyName.className} antialiased bg-gradient-to-r from-cyan-300 from-10% to-cyan-500`}
      >
        {children}
      </body>
    </html>
  );
}
