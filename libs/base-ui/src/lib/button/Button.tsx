import MuiButton, { ButtonProps } from '@mui/material/Button';

export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton {...props} />;
};

export default Button;
