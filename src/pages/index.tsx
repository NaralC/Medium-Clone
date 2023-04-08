import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Button } from "../../components/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useUser();

  const makeApiCall = async () => {
    await fetch("/api/hello", {
      method: "post",
      body: JSON.stringify({
        manager: "world",
      }),
    }).then(response => {
      console.log(response)
    })
  };

  return (
    <div className="space-y-5">
      <div>The Future of Article Sharing</div>
      <div className="text-center">yo?</div>
      <div className="text-5xl text-center">
        {user
          ? "Wow this generic CRUD app is going to change the world fosho"
          : "bro go login"}
      </div>
      <Button onClick={makeApiCall}>Test API Route</Button>
    </div>
  );
}
