import { Theme } from "@emotion/react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardRenderer } from "../../components/CardRenderer";

import { useMemo } from "react";
import { ItemFragment } from "../../graphql/fragments.generated";

interface Props {
  title: string;
  categoryNodeId?: string;
  items: Array<ItemFragment | undefined | null>;
  onCardClick?: (item: ItemFragment) => void;
}

export const ItemsByCategoryAccordion = ({
  title,
  categoryNodeId,
  items,
  onCardClick,
}: Props) => {
  const filteredItems = useMemo(
    () =>
      categoryNodeId
        ? items.filter((item) => item?.category?.nodeId === categoryNodeId)
        : items,
    [categoryNodeId, items]
  );

  return (
    <Accordion
      sx={(theme: Theme) => ({
        marginLeft: "-4px",
        marginRight: "-4px",
        "&.Mui-expanded": {
          marginLeft: "-4px",
          marginRight: "-4px",
        },
      })}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <CardRenderer cards={filteredItems} onCardClick={onCardClick} />
      </AccordionDetails>
    </Accordion>
  );
};
