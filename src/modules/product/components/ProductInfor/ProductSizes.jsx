import { Button, Stack, Typography } from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useTheme } from '@mui/styles';
import openSocket from 'socket.io-client';
import { useEffect, useState } from 'react';

function ProductSizes({ sizes, onChange, product, isSoldOut, currentSize, onDisplayModal }) {
  const [productSizes, setProductSizes] = useState(sizes);
  const [selectedSize, setSelectedSize] = useState(currentSize);
  const theme = useTheme();

  useEffect(() => {
    setSelectedSize(currentSize);
  }, [currentSize]);

  useEffect(() => {
    const socket = openSocket(process.env.NEXT_PUBLIC_DB_BASE_URL);
    socket.on('orders', (data) => {
      const { action } = data;

      if (action === 'create') {
        const loadedSizes = data.productSizes;
        const sizesData = loadedSizes.find((item) => item.productId === product._id);

        setProductSizes(sizesData.sizes);

        const remainingCurrentSize = sizesData.sizes.find((size) => size.name === selectedSize?.name);
        if (remainingCurrentSize?.remainingQuantity > 0) {
          setSelectedSize(remainingCurrentSize);
        }
      }
    });
  }, [product._id, selectedSize]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: 400 }}>Chọn size:</Typography>
        <Typography
          sx={{ fontWeight: 400, textDecorationLine: 'underline', cursor: 'pointer' }}
          onClick={onDisplayModal}
        >
          <StraightenIcon sx={{ mr: 1 }} />
          Hướng dẫn chọn size
        </Typography>
      </Stack>
      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        {productSizes?.map((size) => (
          <Button
            key={size.name}
            variant="outlined"
            disabled={size.remainingQuantity === 0 || isSoldOut(size.name)}
            onClick={onChange.bind(this, size)}
            sx={{
              borderColor: theme.palette.grey['900'],
              borderRadius: 0,
              backgroundColor:
                selectedSize?.name === size.name ? `${theme.palette.grey['900']} !important` : 'transparent',
              color: selectedSize?.name === size.name && 'white',
            }}
          >
            {size.name}
          </Button>
        ))}
      </Stack>

      {selectedSize && (
        <Typography sx={{ fontWeight: 400, fontSize: 14, mt: 1 }}>
          Còn lại: {selectedSize.remainingQuantity} sản phẩm
        </Typography>
      )}
    </>
  );
}

export default ProductSizes;
