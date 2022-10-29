import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/auth/auth.context";

export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      async function checkAuthentication() {
        if (user === null) {
          router.push("/login");
        }
      }
      void checkAuthentication();
    }, [user]);

    // Protect route
    if (!user || !user.email || user["emailVerified"] === false) {
      return null;
    }

    return <Component {...props} />;
  };
}
