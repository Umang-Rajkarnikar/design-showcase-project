import {
  Avatar,
  Button,
  ButtonProps,
  Link,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styles from "./SubmitProjectForm.module.css";
import { AuthContext } from "../../contexts/auth/auth.context";
import { CustomInputFieldComponent } from "../custom-input-field/CustomInputField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { colors } from "../../theme/theme";
import Image from "next/image";

export const SubmitProjectForm = () => {
  // Router
  const router = useRouter();

  // Context
  const { user, login, verify, signInWithGoogle } = useContext(AuthContext);

  // States
  const [name, setName] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [images, setImages] = useState<File[]>([]);

  const handleErrors = async () => {
    let hasError = false;
    if (!name || !description || images.length === 0) {
      hasError = true;
    }
    return hasError;
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const res = await handleErrors();
    if (res) {
      return;
    }

    // Save to firestore and firebase storage
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...(e.target.files as any as File[])]);
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h3">Submit Project</Typography>
      <div className={styles.formSectionContainer}>
        <div className={styles.formSection}>
          <div>
            <Typography variant="h5">Name *</Typography>
            <Typography variant="subtitle1">
              Please enter name of project
            </Typography>
          </div>

          <CustomInputFieldComponent
            fullWidth
            placeholder="Name"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            sx={{ width: "100%" }}
          />
        </div>
        <div className={styles.formSection}>
          <div>
            <Typography variant="h5">Description *</Typography>
            <Typography variant="subtitle1">
              Please enter description of project
            </Typography>
          </div>

          <CustomInputFieldComponent
            fullWidth
            placeholder="Description"
            onChange={(e: any) => {
              setDescription(e.target.value);
            }}
            sx={{ width: "100%" }}
          />
        </div>
        <div className={styles.formSection}>
          <div>
            <Typography variant="h5">
              Image(s) of Design (at least 1 required) *
            </Typography>
            <Typography variant="subtitle1">
              Please upload images of your design that you wish to showcase
            </Typography>
          </div>
          <Button
            className={styles.imageButton}
            variant="contained"
            component={"label"}
            startIcon={images.length === 0 ? <UploadFileIcon /> : ""}
            disableElevation
            sx={{
              backgroundColor: "#f0f0f0",
              border: "1px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "#0f0f0f",
              },
              color: colors.typographyBlack,
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <>
              {images.length === 0 ? "Upload File(s)" : "Reupload File(s)"}
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                hidden
                onChange={handleFileSelected}
              />
            </>
          </Button>
          {images.length > 0 && (
            <div>
              <Typography variant="h6">Uploaded Files</Typography>
              <div className={styles.imageContainer}>
                {images.map((img, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      width: "400px",
                      objectFit: "cover",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                    src={URL.createObjectURL(img)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="contained"
        sx={{ borderRadius: "10px", marginTop: "3rem" }}
        onClick={handleSubmitForm}
        fullWidth
        disabled={!name || !description || images.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};
