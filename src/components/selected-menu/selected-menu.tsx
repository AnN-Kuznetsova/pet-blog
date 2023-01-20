import React from "react";
import {
  Box,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { styles } from "./styles";


interface PropsType {
  name: string;
  label: string;
  iconComponent: JSX.Element;
  options: string[];
  optionsLabel: {[key: string]: string};
  selectedOption: string;
  isLoading: boolean;
  onChange: (option: string) => void;
}


export const SelectedMenu: React.FC<PropsType> = (props): JSX.Element => {
  const {
    name,
    label,
    iconComponent,
    options,
    optionsLabel,
    selectedOption,
    isLoading,
    onChange,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: string) => {
    setAnchorEl(null);
    onChange(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <List
        component="nav"
        aria-label={`${name} settings`}
        sx={styles.list}
      >
        <ListItem
          id={`${name}-button`}
          aria-haspopup="listbox"
          aria-controls={`${name}-menu`}
          aria-label={label}
          aria-expanded={open ? `true` : undefined}
          sx={styles.listItem}
        >
          <LoadingButton
            type="button"
            variant="contained"
            loading={isLoading}
            loadingPosition="end"
            endIcon={<></>}
            onClick={handleClickListItem}
          >
            {!!iconComponent &&
              <Box sx={styles.icon}>
                {iconComponent}
              </Box>
            }
            <Box sx={styles.buttonLabel}>
              {!isLoading && selectedOption}
            </Box>
          </LoadingButton>
        </ListItem>
      </List>

      <Menu
        id={`${name}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${name}-button`,
          role: `listbox`,
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            disabled={option === selectedOption}
            selected={option === selectedOption}
            onClick={() => handleMenuItemClick(option)}
          >
            {optionsLabel[option]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
