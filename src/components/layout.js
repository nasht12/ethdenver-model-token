import styles from "@/styles/Home.module.css";
import Header from "./header";
import ModelTabs from "./modeltab";
import { useSession, signIn, signOut } from "next-auth/react";

function LoggedInLayout({ children }) {
  return (
    <>
      <Header />
      <ModelTabs />
      <main className={styles.main}> {children}</main>
    </>
  );
}

function LoggedOutLayout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}> {children}</main>
    </>
  );
}

function Layout({ children }) {
  const { data: session } = useSession();

  return session ? (
    <LoggedInLayout>{children}</LoggedInLayout>
  ) : (
    <LoggedOutLayout>{children}</LoggedOutLayout>
  );
}

export default Layout;
