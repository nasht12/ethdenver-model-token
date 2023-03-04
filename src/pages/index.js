import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Login from "../components/login";
import LoggedInAppBar from "../components/loggedin";
import LoginAppBar from "../components/login";
import Header from "../components/header";
import Layout from "../components/Layout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typography from "@mui/material/Typography";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const { contract } = useContract(
    "0xa75A56762c828818A9d5cfb110f30C15d73686A2"
  );
  const { data, isLoading } = useContractRead(contract, "symbol");
  const { name } = useContractRead(contract, "name");
  return (
    <>
      <Head>
        <title>AI Model Tokenizer</title>
        <meta name="description" content="Tokenize AI models" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ backgroundColor: "white", color: "black", padding: "10px" }}
          >
            {" "}
            AI Model and Dataset Tokenizer
          </Typography>
          <ConnectWallet />
          {data}
          {name}
        </div>
      </Layout>
    </>
  );
}
