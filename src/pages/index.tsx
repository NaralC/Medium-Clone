import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useUser();

  return (
    <div className="">
      <div>The Future of Article Sharing</div>
      <div className="text-center">yo?</div>
      <div className="text-5xl text-center">
        {user ? "Wow this generic CRUD app is going to change the world fosho" : "bro go login"}
      </div>
    </div>
  );
}
