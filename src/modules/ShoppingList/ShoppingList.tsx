import {
  Card,
  CardHeader,
  Grid,
  SxProps,
  Button,
  Typography,
  Theme,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { appSlice, View } from "../../state/app";
import { useDispatch } from "react-redux";
import { useShoppingListByNodeIdQuery } from "./query.generated";

const cardCss: SxProps = {
  width: "120px",
  height: "120px",
};

const cards = Array(30).fill({ name: "Text" });

export const ShoppingList = ({ nodeId }: { nodeId: string }) => {
  const disptach = useDispatch();
  const [shoppingList] = useShoppingListByNodeIdQuery({
    variables: { nodeId },
  });

  return (
    <Grid container flexDirection="column" spacing={1} sx={{ padding: "4px" }}>
      <Grid item>
        <Button
          startIcon={<ArrowBackIcon />}
          title="back"
          onClick={() =>
            disptach(appSlice.actions.navigate({ view: View.Lists }))
          }
        >
          Back
        </Button>

        <Grid item>
          <Typography variant="h5" component="div" align="center">
            {shoppingList.data?.shoppingListByNodeId?.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container spacing={1} justifyContent="center">
        {shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes.map(
          (value) => (
            <Grid key={value?.itemId} item>
              <Card sx={cardCss}>
                <CardHeader title={value?.item?.name} />
                <CardContent>
                  <Typography>{value?.additionalInformations}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      <Grid item container spacing={1} justifyContent="center">
        {cards.map((value, index) => (
          <Grid key={index} item>
            <Card sx={cardCss}>
              <CardHeader title={value.name} />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item>
        <Accordion
          sx={(theme: Theme) => ({
            background: theme.palette.background.default,
            marginLeft: "-4px",
            marginRight: "-4px",
          })}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Last Used</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <Grid container spacing={1} justifyContent="center">
              {cards.map((value, index) => (
                <Grid key={index} item>
                  <Card sx={cardCss}>
                    <CardHeader title={value.name} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
