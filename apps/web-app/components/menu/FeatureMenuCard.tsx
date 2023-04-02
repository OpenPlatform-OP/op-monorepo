import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { FC, ReactNode } from 'react';

type FeatureCardAction = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => unknown;
  text: string;
  key: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
};

type Props = {
  title: string;
  actions: FeatureCardAction[];
};

const FeatureMenuCard: FC<Props> = ({ title, actions }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: 'solid 1px transparent',
        borderRadius: '15px',
      }}
    >
      <CardContent>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
        <Divider
          sx={{
            mt: 2,
          }}
        />
        <Box m={5}>
          {actions.map(
            ({ key, startIcon, endIcon, variant, onClick, text, color }) => (
              <Button
                sx={{
                  m: 3,
                }}
                key={key}
                startIcon={startIcon}
                endIcon={endIcon}
                variant={variant || 'contained'}
                color={color || 'primary'}
                onClick={onClick}
              >
                {text}
              </Button>
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureMenuCard;
