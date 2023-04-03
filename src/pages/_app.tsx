import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../styles/globals.css";

// For providers (NextUI, Supabase Instance)
// Also Navbar + Box/Container/Card

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  );

  useEffect(() => {
    // import('preline')
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Navbar />
      <div className="flex flex-col justify-center w-full px-10 py-5 mx-auto text-center align-middle">
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
}
