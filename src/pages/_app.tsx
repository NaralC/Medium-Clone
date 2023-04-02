import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Box } from "../../components/Box";

// For providers (NextUI, Supabase Instance)
// Also Navbar + Box/Container/Card

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <NextUIProvider>
        {/* Navbar goes here! */}
        <Box
          css={{
            px: "$12",
            py: "$15",
            mt: "$12",
            "@xsMax": {
              px: "$10",
            },
            maxWidth: "800px",
            margin: "0 auto"
          }}
        >
          <Component {...pageProps} />
        </Box>
      </NextUIProvider>
    </SessionContextProvider>
  );
}
