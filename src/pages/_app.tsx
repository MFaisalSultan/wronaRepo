import { type AppType } from "next/app";

import { api } from "@/utils/api";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </AnimatePresence>
  );
};

export default api.withTRPC(MyApp);
