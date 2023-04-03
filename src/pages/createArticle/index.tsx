import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { TextArea } from "../../../components/TextArea";
import { Button } from "../../../components/Button";
import { FormEvent, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default function CreateArticle() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const initialState = {
    title: "",
    description: "",
  };

  const [articleData, setArticleData] = useState(initialState);

  // Generic onChange depending on element's name
  const handleChange = (e: any) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const createArticle = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("articles")
        .insert([
          {
            title: articleData.title,
            content: articleData.description,
            user_email: user?.email?.toLowerCase(),
            user_id: user?.id,
          },
        ])
        .single();

      if (error) throw error;

      setArticleData(initialState);
      router.push("/mainFeed");

    } catch (error) {
      console.assert(error);
    }
  };

  return (
    <>
      <div className="container flex flex-col gap-10">
        <div>
          <div>Title</div>
          <TextArea
            placeholder="Article Title"
            name="title"
            aria-label="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Description</div>
          <TextArea
            placeholder="Article Description"
            name="description"
            aria-label="description"
            onChange={handleChange}
          />
        </div>
        <div>Posting as {user?.email}</div>
        <Button onClick={createArticle}>Create Article</Button>
      </div>
    </>
  );
}
