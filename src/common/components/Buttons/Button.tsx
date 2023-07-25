import { ReactNode } from 'react';
import { Button as ButtonMUI, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
};

function Button({ children, className, ...other }: ButtonProps) {
  const theme = useTheme<Theme>();

  return (
    <ButtonMUI
      sx={{
        px: 3,
        py: '12px',
        backgroundColor: other!.disabled ? '#cecece !important' : '#111111 !important',
        color: theme.palette.grey['200'],
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontWeight: '500',
      }}
      className={className}
      {...other}
    >
      {children}
    </ButtonMUI>
  );
}

export default Button;
