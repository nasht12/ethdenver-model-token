import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";

function Media() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <main className={styles.main}>
          <h1>Media Models</h1>
          <div>Need to be authenticated to view this page.</div>
        </main>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <main className={styles.main}>Media Models</main>
      </Layout>
    </>
  );
}

export default Media;
