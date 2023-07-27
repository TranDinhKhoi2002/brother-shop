import { Button as ButtonMUI, Theme, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/styles';

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
