import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useRef, useState } from "react";
import { TextArea } from "../../../components/TextArea";
import ArticleCard from "../../../components/ArticleCard";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { usePagination } from "@mantine/hooks";

// TODO: useEffect -> getStaticProps

const ITEMS_PER_PAGE = 4;

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {},
  };
};

export default function MainFeed() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [articles, setArticles] = useState<
    {
      [x: string]: any;
    }[]
  >([]);

  const [visibleArticles, setVisibleArticles] = useState<typeof articles>([]);

  const pagination = usePagination({
    total: Math.ceil(articles.length / ITEMS_PER_PAGE),
    initialPage: 1,
    onChange: (page) => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      setVisibleArticles(articles.slice(start, end));
    },
  });

  const effectRan = useRef(false);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("articles")
          .select("*")
          .limit(10); // Most recent 10 articles

        if (error) {
          console.assert(error);
        }

        if (data !== null) {
          setArticles(data);
          setVisibleArticles(data.slice(0, ITEMS_PER_PAGE));
        }
      } catch (error) {
        console.assert(error);
      }
    };

    if (effectRan.current === false) {
      getArticles();
    }

    return () => {
      effectRan.current = true;
    };
  });

  return (
    <>
      <div className="text-7xl">Main Feed</div>
      <div className="text-4xl">Check out community articles</div>
      <div>
        {visibleArticles.map((article) => {
          return <ArticleCard article={article} key={article.id} />;
        })}
      </div>
      <div>—————————————</div>
      <div className="flex flex-row justify-center w-full gap-10">
        <div onClick={pagination.first}>&lt;&lt;</div>
        <div onClick={pagination.previous}>&lt;</div>
        <div>{pagination.active}</div>
        <div onClick={pagination.next}>&gt;</div>
        <div onClick={pagination.last}>&gt;&gt;</div>
      </div>
    </>
  );
}
