import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  Spacer,
  User,
  Button,
  Checkbox,
  Modal,
  Input,
  Row,
} from "@nextui-org/react";
import { TextArea } from "../../../components/TextArea";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface ArticleProps {
  data: any;
}

export const getServerSideProps: GetServerSideProps<ArticleProps> = async (
  context: GetServerSidePropsContext
) => {
  // Create authenticated Supabase Client
  const supabaseClient = createServerSupabaseClient(context);

  const { data, error } = await supabaseClient
    .from("articles")
    .select("*")
    .filter("id", "eq", context.query.id) // get url query
    .single();

  if (error) {
    console.assert(error);
  } else {
    // console.log(data);
    console.log("data fetched for article!");
  }

  return {
    props: {
      data,
    },
  };
};

export default function Article({ data }: ArticleProps) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [article, setArticle] = useState<any>(data);
  const { id } = router.query; // For fetching article.id from `/article?id=${article.id}`

  const deleteArticle = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      router.push("/mainFeed");
    } catch (error) {
      console.assert(error);
    }
  };

  const editArticle = async () => {
    if (
      newDescriptionRef.current?.value === "" ||
      newTitleRef.current?.value === ""
    )
      return;

    try {
      const { error } = await supabaseClient
        .from("articles")
        .update([
          {
            title: newTitleRef.current?.value,
            content: newDescriptionRef.current?.value,
          },
        ])
        .eq("id", id);

      if (error) throw error;
      router.reload();
      // router.push(`/article?id=${id}`);
    } catch (error) {
      console.assert(error);
    }
  };

  // For edit article modal
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const newTitleRef = useRef<HTMLTextAreaElement>(null);
  const newDescriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-10 text-center">
      <div className="text-7xl">{article.title}</div>
      <div className="text-3xl">
        posted by {article.user_email?.toLowerCase()}
      </div>
      <div className="text-xl">{article.content}</div>
      {user && article.user_id === user.id ? (
        <>
          <Button onClick={deleteArticle} color="error">
            Delete
          </Button>
          <Button auto onPress={openModal}>
            Edit
          </Button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeModal}
          >
            <Modal.Header>
              <Text b size={18}>
                Edit your article
              </Text>
            </Modal.Header>
            <Modal.Body>
              <div>Title</div>
              <TextArea
                ref={newTitleRef}
                // name="new-title"
                aria-label="new-title"
                defaultValue={article.title}
                placeholder="New Article Title"
              />
              <div>Description</div>
              <TextArea
                ref={newDescriptionRef}
                // name="new-description"
                aria-label="new-description"
                defaultValue={article.content}
                placeholder="New Article Description"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="default" onPress={closeModal}>
                Close
              </Button>
              <Button auto onPress={editArticle}>
                Edit Article
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
