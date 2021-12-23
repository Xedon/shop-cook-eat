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
import { useItemsQuery, useShoppingListByNodeIdQuery } from "./query.generated";
import { CardRenderer } from "../../components/CardRenderer";
import {
  useAddItemToShoppingListMutation,
  useDelteItemFromShoppingListMutation,
} from "./mutation.generated";

export const ShoppingList = ({ nodeId }: { nodeId: string }) => {
  const disptach = useDispatch();
  const [shoppingList] = useShoppingListByNodeIdQuery({
    variables: { nodeId },
  });

  const [itemQuery] = useItemsQuery();

  const [_, deleteItemFromShoppingList] =
    useDelteItemFromShoppingListMutation();

  const [__, addItemToShoppingList] = useAddItemToShoppingListMutation();

  return (
    <Grid container flexDirection="column" spacing={1} sx={{ padding: "4px" }}>
      <Grid item>
        <Button
          color="secondary"
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
      <Grid item>
        <CardRenderer
          cards={
            shoppingList.data?.shoppingListByNodeId?.itemShoppingLists.nodes ??
            []
          }
          onCardClick={(cardData) =>
            deleteItemFromShoppingList({ nodeId: cardData.nodeId })
          }
        />
      </Grid>
      <Grid item>
        <Accordion
          sx={(theme: Theme) => ({
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
            <CardRenderer
              cards={itemQuery.data?.items?.nodes ?? []}
              onCardClick={(cardData) =>
                addItemToShoppingList({
                  itemId: cardData.id,
                  shoppingListId: shoppingList.data?.shoppingListByNodeId?.id,
                })
              }
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
