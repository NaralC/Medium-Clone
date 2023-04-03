import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";
import { Text, Spacer, User, Button } from "@nextui-org/react";

export default function Article() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [article, setArticle] = useState<any>({});
  const { id } = router.query; // For fetching article.id from `/article?id=${article.id}`

  useEffect(() => {
    const getArticle = async () => {
      const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .filter("id", "eq", id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setArticle(data);
      }
    };

    if (typeof id !== "undefined") {
      getArticle();
    }
  });

  const deleteArticle = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("articles")
        .delete()
        .eq("id", id)
        
        if (error) throw error;
        router.push("/mainFeed");

    } catch (error) {
      console.assert(error);
    }
  }

  return (
    <div className="flex flex-col gap-10 text-center">
      <div className="text-7xl">{article.title}</div>
      <div className="text-3xl">
        posted by {article.user_email?.toLowerCase()}
      </div>
      <div className="text-xl">{article.content}</div>
      {user && article.user_id === user.id ?
      <>
      <Button>Edit</Button>
      <Button onClick={deleteArticle}>Delete</Button>
      </>  
      :
      <></>
    }
    </div>
  );
}
