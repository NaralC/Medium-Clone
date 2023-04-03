import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
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

export default function Article() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [article, setArticle] = useState<any>({});
  const { id } = router.query; // For fetching article.id from `/article?id=${article.id}`

  useEffect(() => {
    // Fix infinite fetch
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

    return () => {};
  });

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
    if (newDescriptionRef.current?.value === "" || newTitleRef.current?.value === "") return;

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
      router.push(`/article?id=${id}`);

    } catch (error) {
      console.assert(error);
    }
  }

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
