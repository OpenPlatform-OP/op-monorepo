import { FC, forwardRef } from 'react';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MuiGrow, { GrowProps } from '@mui/material/Grow';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';

const BounceIn: FC<GrowProps> = forwardRef((props, ref) => (
  <MuiGrow ref={ref} easing="cubic-bezier(.6,2,.6,2)" {...props} />
));

export type DropdownItemProps = MenuItemProps;

interface DropdownFC extends FC<MenuProps> {
  Item: typeof MuiMenuItem;
}

export const Dropdown: DropdownFC = (props) => {
  return (
    <MuiMenu
      TransitionComponent={BounceIn}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transitionDuration={{
        enter: 500,
        exit: 300,
      }}
      {...props}
    />
  );
};

Dropdown.Item = MuiMenuItem;

export default Dropdown;
