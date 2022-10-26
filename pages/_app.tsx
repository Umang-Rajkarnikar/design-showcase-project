import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../contexts/auth/auth.provider";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import "../public/fonts/Poppins/Poppins.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
