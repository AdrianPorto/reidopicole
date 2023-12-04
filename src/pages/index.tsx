import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} flex`}>
      <NavBar></NavBar>
      <div className=" bg-gray-600 w-full h-screen flex p-[20px]"></div>
    </main>
  );
}
