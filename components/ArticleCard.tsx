import { Card, Text } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type Props = {
  article: any;
};

export default function ArticleCard({ article }: Props) {
  const router = useRouter();

    const getDate = (): string => {
        let time = Date.parse(article.inserted_at);
        let date = new Date(time);

        return date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();
    }

  return (
    <Card
      isPressable
      onPress={() => {
        router.push(`/article?id=${article.id}`);
      }}
      css={{
        mb: "$10",
      }}
    >
      <Card.Body>
        <Text h2>{article.title}</Text>
        <Text b>Posted {getDate()}</Text>
        <Text b>By {article.user_email.toLowerCase()}</Text>
      </Card.Body>
    </Card>
  );
}
