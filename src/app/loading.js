import { Poppins } from "next/font/google";
import {Header} from "./components/header";
import {Footer} from "./components/footer";
import { Loader2, RefreshCw, Circle, Spinner } from 'lucide-react'
import "./globals.css";

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
          <main className=""> 
                  <div className="py-44 flex items-center justify-center">
                  <Circle 
                    className="animate-spin text-cyan-400" 
                    size={36} 
                  /> 
                </div>
          </main>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
