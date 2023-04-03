import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useRef, useState } from "react";
import { TextArea } from "../../../components/TextArea";

export default function MainFeed() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [articles, setArticles] = useState<{
    [x: string]: any;
}[]>([]);

  const getArticles = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .limit(10) // Most recent 10 articles

      console.log(data);

      if (data !== null) {
        setArticles(data)
      }

    } catch (error) {
      console.assert(error);
    }
  }

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) getArticles();
  
    return () => {
      effectRan.current = true;
    }
  })

  return (
    <>
      <text className="text-7xl">Main Feed</text>
      <text className="text-4xl">Check out community articles</text>
    </>
  );
}
