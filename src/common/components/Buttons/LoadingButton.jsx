import { LoadingButton as LoadingButtonMUI } from '@mui/lab';
import { useTheme } from '@mui/styles';

function LoadingButton({ children, loading, fullWidth, sx, ...other }) {
  const theme = useTheme();

  return (
    <LoadingButtonMUI
      fullWidth={fullWidth}
      loading={loading}
      sx={{
        px: 3,
        py: '12px',
        backgroundColor: '#111111 !important',
        color: theme.palette.grey['200'],
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontWeight: '500',
        ...sx,
      }}
      {...other}
    >
      {children}
    </LoadingButtonMUI>
  );
}

export default LoadingButton;
