import type { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface Props {
  children?: ReactNode;
}

export default function RootLayout(props: Props) {
  const router = useRouter();

  // Define the animation properties
  const pageVariants = {
    hidden: { y: 1000 },
    enter: { y: 0 },
    exit: { y: 1000 },
  };
  const homePageVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const pageTransition = {
    type: "easeInOut",
    duration: 0.5,
  };

  return (
    <>
      <Head>
        <title>Wrona</title>
        <meta name="description" content="Site under construction." />
        <meta name="robots" content="follow, index" />
        <meta
          property="og:url"
          content={`https://www.wrona.com${router.asPath}`}
        />
        <link rel="canonical" href={`https://www.wrona.com${router.asPath}`} />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta name="theme-color" content="#0E212D" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@wrona" />
        <meta name="twitter:creator" content="@wrona" />
        <meta name="twitter:title" content="Wrona" />
        <meta name="twitter:description" content="Site under construction." />
        <meta name="twitter:image" content="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wrona" />
        <meta property="og:description" content="Site under construction." />
        <meta property="og:site_name" content="Wrona" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="manifest" content="/manifest.json" />
      </Head>
      <main className="min-h-screen">
        <Navbar />
        {router.route !== "/" ? (
          <motion.div
            key={router.route}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            {props.children}
          </motion.div>
        ) : (
          <motion.div
            key={router.route}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={homePageVariants}
            transition={pageTransition}
          >
            {props.children}
          </motion.div>
        )}
      </main>
    </>
  );
}
