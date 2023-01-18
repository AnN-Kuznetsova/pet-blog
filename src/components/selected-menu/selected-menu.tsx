import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";

import { styles } from "./styles";


interface PropsType {
  name: string;
  label: string;
  iconComponent: JSX.Element;
  options: string[];
  optionsLabel: {[key: string]: string};
  selectedOption: string;
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
    onChange,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    () => options.findIndex((option) => option === selectedOption)
  );
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    onChange(options[index]);
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
          <Button
            type="button"
            variant="contained"
            onClick={handleClickListItem}
          >
            {!!iconComponent &&
              <Box sx={styles.icon}>
                {iconComponent}
              </Box>
            }
            {options[selectedIndex]}
          </Button>
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
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === selectedIndex}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
          >
            {optionsLabel[option]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
