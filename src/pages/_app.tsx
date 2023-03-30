import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
