import { Button, Checkbox, Link, Snackbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "./LoginCard.module.css";
import { regexEmailTest } from "../../constants/regex";
import { AuthContext } from "../../contexts/auth/auth.context";
import googleIcon from "../../public/assets/google_icon.svg";
import { EmailButton } from "../email-button/EmailButton";
import { CustomInputFieldComponent } from "../custom-input-field/CustomInputField";

export const LoginCard = () => {
  // Router
  const router = useRouter();

  // Context
  const { user, login, verify, signInWithGithub, signInWithGoogle } =
    useContext(AuthContext);

  // States
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [isChecked, setIsChecked] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleErrors = async () => {
    let hasError = false;
    if (!email || !regexEmailTest.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarOpen(true);
      hasError = true;
    } else if (!password) {
      setSnackbarMessage("Please enter a password with 8 or more characters.");
      setSnackbarOpen(true);
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
      await login({
        email: email ?? "",
        password: password ?? "",
      });
    } catch (error) {
      console.error(error);
    }
    if (user?.emailVerified === false) {
      await verify();
    }
  };

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    signInWithGoogle();
  };

  useEffect(() => {}, [user]);

  return (
    <div className={styles.card}>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={SNACKBAR_AUTO_DURATION}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      /> */}
      <Typography variant="h3">Log in</Typography>

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
          sx={{ width: "100%" }}
        />
        <CustomInputFieldComponent
          fullWidth
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          sx={{ width: "100%" }}
        />
      </div>

      <Button
        variant="contained"
        sx={{ borderRadius: "10px" }}
        onClick={handleRegularLogin}
        fullWidth
      >
        Log in
      </Button>
      <div className={styles.bottomButtons}>
        <Link sx={{ textDecoration: "none" }} href="/signup">
          Sign Up
        </Link>
        <Link sx={{ textDecoration: "none" }} href="/reset-password">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};
