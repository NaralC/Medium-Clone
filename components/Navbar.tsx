import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Button } from "../components/Button"
import Link from "next/link";

export default function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOutUser = () => {
    supabaseClient.auth.signOut();
    router.push("/"); // Sends user to index.tsx
  };

  return (
    <>
      <header className="z-50 flex flex-wrap w-full py-4 text-sm sm:justify-start sm:flex-nowrap dark:bg-gray-800">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <Link href="/">💀 Branding 💀</Link>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            <Link href="/mainFeed">Main Feed</Link>
            <Link href="/createArticle">Create Article</Link>
            {!user ? (
              <>
                <Link href="/login">
                  <Button color="green">Login</Button>
                </Link>
              </>
            ) : (
              <>
                <div>Hey, {user?.email}</div>
                <div>
                  <button onClick={() => signOutUser()}>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
