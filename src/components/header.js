import LoginAppBar from "./login";
import LoggedInAppBar from "./loggedin";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  //   if (loading) {
  //     return null; // or loading indicator
  //   }

  return session ? <LoggedInAppBar /> : <LoginAppBar />;
}

export default Header;
