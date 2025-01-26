import { Poppins } from "next/font/google";
import {Header} from "./header";
import {Footer} from "./footer"; 
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
        className={`${fontFamilyName.className} antialiased`}
      >
        <div id="wrapper">
        <Header/>
          <main className="p-4">{children} </main>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
