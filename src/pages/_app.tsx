import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Box from "../../components/Box";
import Navbar from "../../components/Navbar";

// For providers (NextUI, Supabase Instance)
// Also Navbar + Box/Container/Card

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        <Navbar />
        <Box
        >
          <Component {...pageProps} />
        </Box>
    </SessionContextProvider>
  );
}
