import { Button, Checkbox, Link, Snackbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "./SignUpCard.module.css";
import { regexEmailTest } from "../../constants/regex";
import { AuthContext } from "../../contexts/auth/auth.context";
import googleIcon from "../../public/assets/google_icon.svg";
import { EmailButton } from "../email-button/EmailButton";

import { CustomInputFieldComponent } from "../custom-input-field/CustomInputField";

export const SignUpCard = () => {
  // Router
  const router = useRouter();

  // Context
  const { user, signup, verify, signInWithGithub, signInWithGoogle } =
    useContext(AuthContext);

  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const handleErrors = async () => {
    let hasError = false;
    if (!email || !regexEmailTest.test(email)) {
      hasError = true;
    } else if (!password) {
      hasError = true;
    }
    return hasError;
  };

  const handleRegularLogin = async (e: any) => {
    e.preventDefault();
    const res = await handleErrors();
    if (res) {
      return;
    }

    try {
      await signup({ email, password });
      await verify();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    signInWithGoogle();
  };

  useEffect(() => {}, [user]);

  return (
    <div className={styles.card}>
      <Typography variant="h3">Sign Up</Typography>

      <div className={styles.innerContainer}>
        <EmailButton onClick={handleGoogleLogin} fullWidth>
          <Image src={googleIcon} alt="" />
          <Typography variant="h6">Continue with Google</Typography>
        </EmailButton>
      </div>

      <Typography variant="h6">or</Typography>

      <div className={styles.innerContainer}>
        <CustomInputFieldComponent
          fullWidth
          placeholder="Email"
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <CustomInputFieldComponent
          fullWidth
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <CustomInputFieldComponent
          fullWidth
          placeholder="Re-enter Password"
          type="password"
          onChange={(e: any) => {
            setConfirmedPassword(e.target.value);
          }}
        />
      </div>

      <Button
        variant="contained"
        sx={{ borderRadius: "10px" }}
        onClick={handleRegularLogin}
        fullWidth
        disabled={
          !regexEmailTest.test(email ?? "") ||
          password.length < 8 ||
          password !== confirmedPassword
        }
      >
        Sign Up
      </Button>
      <div className={styles.bottomButtons}>
        <Link sx={{ textDecoration: "none" }} href="/login">
          Log in
        </Link>
        <Link sx={{ textDecoration: "none" }} href="/reset-password">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};
