import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";

function Code() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <main className={styles.main}>
          <h1>Code Models</h1>
          <div>Need to be authenticated to view this page.</div>
        </main>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <main className={styles.main}>Code Models</main>
      </Layout>
    </>
  );
}

export default Code;
