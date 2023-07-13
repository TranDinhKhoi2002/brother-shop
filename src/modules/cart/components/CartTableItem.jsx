import { Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import { toast } from 'react-toastify';
import { assignProductsToCart, fetchUpdateQuantity, updateAmountOfProduct } from '@/redux/slices/cart';
import Link from 'next/link';

function CartTableItem({ item, labelId, isItemSelected, onClick }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleUpdateQuantity = async (quantity) => {
    if (!isAuthenticated) {
      dispatch(
        updateAmountOfProduct({
          id: item.productId._id,
          size: item.size,
          quantity: quantity,
        }),
      );
      return;
    }

    try {
      const { cart, success } = await dispatch(
        fetchUpdateQuantity({ productId: item.productId._id, size: item.size, quantity: quantity }),
      ).unwrap();

      if (success) {
        dispatch(assignProductsToCart({ cart }));
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
    return;
  };

  const handleIncreaseQuantity = () => {
    handleUpdateQuantity(quantity + 1);
    setQuantity((prevState) => prevState + 1);
  };

  const handleDecreaseQuantity = () => {
    handleUpdateQuantity(quantity - 1);
    setQuantity((prevState) => prevState - 1);
  };

  return (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="secondary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
          onClick={(event) => onClick(event, item)}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" align="center">
        <Image
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          publicId={item.productId.images.mainImg}
          style={{ width: '100px' }}
          alt={item.productId.name}
        />
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: 500 }}>
        <Link href={`/shop/products/${item.productId._id}`}>{item.productId.name}</Link>
      </TableCell>
      <TableCell align="center">{printNumberWithCommas(item.productId.price)} đ</TableCell>
      <TableCell align="center">{printNumberWithCommas(item.size)}</TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <IconButton onClick={handleDecreaseQuantity} disabled={quantity === 1}>
            <RemoveIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={handleIncreaseQuantity}>
            <AddIcon />
          </IconButton>
        </Stack>
      </TableCell>
      <TableCell align="center">{printNumberWithCommas(item.productId.price * item.quantity)}đ</TableCell>
    </TableRow>
  );
}

export default CartTableItem;
