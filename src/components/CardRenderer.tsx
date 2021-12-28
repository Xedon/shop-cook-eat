import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";

interface CardRendererProps<T> {
  sx?: SxProps<Theme>;
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
  sx,
}: CardRendererProps<T>) => {
  return (
    <Grid sx={sx} container spacing={1} justifyContent="center">
      {cards
        .filter((value) => value)
        .map((value) => (
          <Grid key={value?.nodeId} item>
            <Card
              sx={cardCss}
              onClick={() => value && onCardClick && onCardClick(value)}
              onTouchEnd={(e) => console.log(e.timeStamp)}
            >
              <CardHeader title={value?.item?.name ?? value?.name} />
              <CardContent>
                <Typography>{value?.additionalInformations}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};
