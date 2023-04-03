import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <div>The Future of Article Sharing</div>
      <div className="text-center">yo?</div>
      <div className="text-5xl text-center">
        Wow this generic CRUD app is going to change the world fosho
      </div>
    </div>
  );
}
