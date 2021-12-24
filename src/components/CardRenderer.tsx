import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  SxProps,
  Collapse,
} from "@mui/material";

import { TransitionGroup } from "react-transition-group";

interface CardRendererProps<T> {
  onCardClick?: (cardData: T) => void;
  cards: Array<
    | ({
        nodeId?: string;
        additionalInformations?: string | null | undefined;
        name?: string | null | undefined;
        item?: { name: string } | null | undefined;
      } & T)
    | undefined
    | null
  >;
}

const cardCss: SxProps = {
  width: "120px",
  height: "120px",
};

export const CardRenderer = <T,>({
  cards,
  onCardClick,
  ...rest
}: CardRendererProps<T>) => {
  return (
    <Grid container spacing={1} justifyContent="center">
      <TransitionGroup>
        {cards
          .filter((value) => value)
          .map((value) => (
            <Collapse key={value?.nodeId}>
              <Grid key={value?.nodeId} item>
                <Card
                  sx={cardCss}
                  onClick={() => value && onCardClick && onCardClick(value)}
                >
                  <CardHeader title={value?.item?.name ?? value?.name} />
                  <CardContent>
                    <Typography>{value?.additionalInformations}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Collapse>
          ))}
      </TransitionGroup>
    </Grid>
  );
};
