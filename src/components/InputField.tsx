import { useInput } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import React, { Ref } from "react";

const StyledInputElement = styled("input")(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  borderStyle: "hidden",
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  outline: "none",
  "&:focus-visible": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "&:focus": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
}));

export const InputField = React.forwardRef(function CustomInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  ref: Ref<HTMLInputElement>
) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});
