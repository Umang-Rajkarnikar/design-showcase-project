import { TextField, styled, Select } from "@mui/material";
import { colors } from "../../theme/theme";

export const CustomInputFieldComponent = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: "12px",
    borderColor: colors.typographyGray,
    "&:hover fieldset": {
      borderColor: colors.typographyGray,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.typographyGray,
    },
  },
});
