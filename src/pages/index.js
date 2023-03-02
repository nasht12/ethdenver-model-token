import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "../components/login";
import LoggedInAppBar from "../components/loggedin";
import LoginAppBar from "../components/login";
import Header from "../components/header";
import Layout from "../components/Layout";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>AI Model Tokenizer</title>
        <meta name="description" content="Tokenize AI models" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      {/* <main className={styles.main}>Hello</main> */}
    </>
  );
}
