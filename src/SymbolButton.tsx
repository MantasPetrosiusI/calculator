import { Button, Grid, styled } from "@mui/material";

interface SymbolButtonProps {
  symbol: string;
  selectSymbol: (symbol: string) => void;
  selectedSymbol: string;
}

const StyledButton = styled(Button)<{ selected: boolean }>((props) => ({
  backgroundColor: "rgb(254,241,73,.1",
  borderColor: props.selected ? "#fff" : "rgb(254,241,73,.5)",
}));

export const SymbolButton: React.FC<SymbolButtonProps> = ({
  symbol,
  selectSymbol,
  selectedSymbol,
}) => {
  return (
    <Grid item xs={3}>
      <StyledButton
        fullWidth
        variant="outlined"
        onClick={() => selectSymbol(symbol)}
        selected={selectedSymbol === symbol}
      >
        {symbol}
      </StyledButton>
    </Grid>
  );
};
