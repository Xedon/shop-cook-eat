import { Card, CardHeader, Grid, SxProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { appSlice, Navigation } from "../../state/app";

const cardCss: SxProps = {
  width: "95vw",
};

const cards = Array(10).fill({ name: "Text" });

export const ShoppingLists = () => {
  const dispatch = useDispatch();
  return (
    <Grid
      container
      alignItems="center"
      rowGap="4px"
      flexDirection="column"
      sx={{ paddingTop: "4px" }}
    >
      {cards.map((value, index) => (
        <Grid key={index} item>
          <Card
            sx={cardCss}
            onClick={() => dispatch(appSlice.actions.navigate(Navigation.List))}
          >
            <CardHeader title={value.name} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
