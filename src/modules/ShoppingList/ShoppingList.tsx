import { Card, CardHeader, Grid, SxProps } from "@mui/material";

const cardCss: SxProps = {
  width: "80px",
  height: "80px",
};

const cards = Array(10).fill({ name: "Text" });

export const ShoppingList = () => {
  return (
    <Grid
      container
      justifyContent="center"
      rowGap="4px"
      columnGap="4px"
      flexDirection="row"
      sx={{ paddingTop: "4px" }}
    >
      {cards.map((value, index) => (
        <Grid key={index} item>
          <Card sx={cardCss}>
            <CardHeader title={value.name} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
