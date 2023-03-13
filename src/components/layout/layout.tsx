import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { BasicModal } from "../basic-modal/basic-modal";
import { Snack } from "../snack/snack";
import { TopMenu } from "../top-menu/top-menu";
import { styles } from "./styles";


export const Layout: React.FC = (): JSX.Element => {
  const inputNumber: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const decrementButton = useRef(null);
  const incrementButton = useRef(null);

  const handleDecrementButtonClick = () => {
    if (inputNumber.current) {
      inputNumber.current.stepDown();
    }
  };

  const handleIncrementButtonClick = () => {
    if (inputNumber.current) {
      inputNumber.current.stepUp();
    }
  };

  return (
    <Box sx={styles.container}>
      <TopMenu />

      <div style={{margin: `20px 20px 40px`}}>
        <div className="input-type-number">
          <button
            ref={decrementButton}
            type="button"
            className="input-number-button  input-number-button--decrement"
            onClick={handleDecrementButtonClick}
          >-</button>
          <input
            ref={inputNumber}
            type="number"
            defaultValue={0}
          />
          <button
            ref={incrementButton}
            type="button"
            className="input-number-button  input-number-button--increment"
            onClick={handleIncrementButtonClick}
          >+</button>
        </div>
      </div>

      <main style={styles.main}>
        <Outlet />
      </main>

      <BasicModal />
      <Snack />
    </Box>
  );
};
