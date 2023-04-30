import { styled } from '@mui/material/styles';
import MuiButton, { ButtonProps } from '@mui/material/Button';

const CustomizedButton = styled(MuiButton)<ButtonProps>(
  ({ theme, color = 'primary' }) =>
    color !== 'inherit' && {
      boxShadow: `0 0 4px 0 ${theme.palette[color].main}`,
      outline: '2px solid transparent',
      outlineOffset: '4px',
      transition: `
        box-shadow 1s,
        background 1s,
        outline 1s,
        outline-offset 1s
      `,
      '&:hover, &:focus': {
        boxShadow: `0 0 16px 0 ${theme.palette[color].main}`,
        outline: `2px solid ${theme.palette[color].main}`,
        outlineOffset: '0',
        transition: `
          box-shadow 0.5s,
          background 0.5s,
          outline 0.5s,
          outline-offset 0.5s
        `,
      },
    }
);

export const Button: React.FC<ButtonProps> = (props) => {
  return <CustomizedButton {...props} />;
};

export default Button;
