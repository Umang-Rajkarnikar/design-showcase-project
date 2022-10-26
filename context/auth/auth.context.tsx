import { createContext } from "react";
import firebase from "firebase/auth";

export interface ISignup {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
}

interface IAuthContext {
  user: firebase.User | null;
  token: string;
  authenticated: boolean;
  signup: ((data: ISignup) => Promise<firebase.UserCredential>) | (() => void);
  signInWithGoogle: () => void;
  signInWithGithub: () => void;
  login: ((data: ISignup) => Promise<firebase.UserCredential>) | (() => void);
  verify: () => Promise<void> | void;
  resetPassword: ((data: IResetPassword) => Promise<void>) | (() => void);
  signout: () => Promise<void> | void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: "",
  authenticated: false,
  signup: () => {},
  login: () => {},
  verify: () => {},
  resetPassword: () => {},
  signInWithGoogle: () => {},
  signInWithGithub: () => {},
  signout: () => {},
});
