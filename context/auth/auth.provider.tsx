import { useState, useEffect } from "react";
import type { FC, ReactElement } from "react";
import { AuthContext } from "./auth.context";
import { auth } from "../../constants/firebase";
import firebase, {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { ISignup, IResetPassword } from "./auth.context";

interface Props {
  children: ReactElement;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [token, setToken] = useState<string>("");
  const [authenticated, setAuthenticated] = useState(false);

  const signup = (data: ISignup) => {
    const { email, password } = data;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (data: ISignup) => {
    const { email, password } = data;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const verify = async (): Promise<void> => {
    if (!auth.currentUser) {
      return;
    }

    try {
      return await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.log("verification error");
    }
  };

  const resetPassword = async (data: IResetPassword): Promise<void> => {
    const { email } = data;
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
      });
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user.email) {
          if (user.emailVerified == false) {
            window.location.reload();
          }
        }
      })
      .catch((error) => {});
  };

  const signout = async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log("signout success");
    } catch (error) {
      console.log("signout error");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log("unsubscribe");
      setUser(firebaseUser);
      if (firebaseUser?.emailVerified === false) {
        return;
      }
      const jwt = await firebaseUser?.getIdToken();
      setToken(jwt ?? "");
      setAuthenticated(jwt ? true : false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authenticated,
        signup,
        login,
        verify,
        resetPassword,
        signInWithGoogle,
        signInWithGithub,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
