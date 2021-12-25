import { Fade } from "@mui/material";
import { useSelector } from "react-redux";
import { View } from "../../state/app";
import { InputField } from "../../components/InputField";
import { RootState } from "../../state/store";

export const ListMenuAddition = () => {
  const { view } = useSelector((state: RootState) => state.app.navigation);
  return (
    <Fade unmountOnExit in={view === View.List}>
      <InputField />
    </Fade>
  );
};
