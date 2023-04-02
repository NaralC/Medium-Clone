import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/mainFeed");
  }

  return (
    <>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
        }}
      />
    </>
  );
}
