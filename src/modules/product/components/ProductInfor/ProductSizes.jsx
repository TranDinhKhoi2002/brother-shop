import { Button, Stack, Typography } from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useTheme } from '@mui/styles';

function ProductSizes({ sizes, onChange, currentSize }) {
  const theme = useTheme();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: 400 }}>Chọn size:</Typography>
        <Typography sx={{ fontWeight: 400, textDecorationLine: 'underline' }}>
          <StraightenIcon sx={{ mr: 1 }} />
          Hướng dẫn chọn size
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        {sizes.map((size) => (
          <Button
            key={size.name}
            variant="outlined"
            onClick={onChange.bind(this, size)}
            sx={{
              borderColor: theme.palette.grey['900'],
              color: theme.palette.grey['900'],
              borderRadius: 0,
              backgroundColor:
                currentSize?.name === size.name ? `${theme.palette.grey['900']} !important` : 'transparent',
              color: currentSize?.name === size.name && 'white',
            }}
          >
            {size.name}
          </Button>
        ))}
      </Stack>
    </>
  );
}

export default ProductSizes;
