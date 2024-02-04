import { Button, Container, Grid, Paper, styled } from "@mui/material";
import React, { useState } from "react";
import { SymbolButton } from "./SymbolButton";
import { DigitButton } from "./DigitButton";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));
function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [symbol, setSymbol] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const clear = () => {
    setPrevValue("");
    setSymbol("");
    setCurrentValue("0");
    setOverwrite(true);
  };
  const del = () => {
    setCurrentValue("0");
    setOverwrite(true);
  };
  const percentage = () => {
    const value = parseFloat(currentValue);
    setCurrentValue((value / 100).toString());
  };
  const hundreth = () => {
    const value = parseFloat(currentValue);
    setCurrentValue((1 / value).toString());
  };
  const powerTwo = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(Math.pow(value, 2).toString());
  };
  const root = () => {
    const value = parseFloat(currentValue);
    setCurrentValue(Math.sqrt(value).toString());
  };
  const inverse = () => {
    const value = parseFloat(currentValue);
    setCurrentValue((value * -1).toString());
  };
  const calculation = () => {
    if (!prevValue || !symbol) return currentValue;

    const current = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    let result = 0;

    switch (symbol) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
    }
    return result;
  };
  const equals = () => {
    const value = calculation();
    setCurrentValue(`${value}`);
    setPrevValue("");
    setSymbol("");
    setOverwrite(true);
  };
  const selectSymbol = (symbol: string) => {
    if (prevValue) {
      const value = calculation();
      setCurrentValue(`${value}`);
      setPrevValue(`${value}`);
    }
    setPrevValue(currentValue);
    setSymbol(symbol);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit === ".") return;
    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <SymbolButton
              symbol={"%"}
              selectSymbol={percentage}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"CE"}
              selectSymbol={clear}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"C"}
              selectSymbol={del}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"Del"}
              selectSymbol={selectSymbol}
              selectedSymbol={symbol}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <SymbolButton
              symbol={"1/x"}
              selectSymbol={hundreth}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"x2"}
              selectSymbol={powerTwo}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"root"}
              selectSymbol={root}
              selectedSymbol={symbol}
            />
            <SymbolButton
              symbol={"/"}
              selectSymbol={selectSymbol}
              selectedSymbol={symbol}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"7"} enterDigit={setDigit} />
            <DigitButton digit={"8"} enterDigit={setDigit} />
            <DigitButton digit={"9"} enterDigit={setDigit} />
            <SymbolButton
              symbol={"*"}
              selectSymbol={selectSymbol}
              selectedSymbol={symbol}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"4"} enterDigit={setDigit} />
            <DigitButton digit={"5"} enterDigit={setDigit} />
            <DigitButton digit={"6"} enterDigit={setDigit} />
            <SymbolButton
              symbol={"-"}
              selectSymbol={selectSymbol}
              selectedSymbol={symbol}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit={"1"} enterDigit={setDigit} />
            <DigitButton digit={"2"} enterDigit={setDigit} />
            <DigitButton digit={"3"} enterDigit={setDigit} />
            <SymbolButton
              symbol={"+"}
              selectSymbol={selectSymbol}
              selectedSymbol={symbol}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <SymbolButton
              symbol={"+/-"}
              selectSymbol={inverse}
              selectedSymbol={symbol}
            />
            <DigitButton digit={"0"} enterDigit={setDigit} />
            <DigitButton digit={"."} enterDigit={setDigit} />
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
