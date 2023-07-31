import { Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { ReactElement, useEffect, useState } from 'react';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { useSelector } from 'react-redux';
import { printNumberWithCommas } from '@/utils/common';
import { toast } from 'react-toastify';
import { assignProductsToCart, fetchUpdateQuantity, updateAmountOfProduct } from '@/redux/slices/cart';
import Link from 'next/link';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { cld } from '@/utils/cloudinary';

type CartTableItemProps = {
  item: CartItem;
  labelId: string;
  isItemSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (event: any, item: CartItem) => void;
};

function CartTableItem({ item, labelId, isItemSelected, onClick }: CartTableItemProps): ReactElement {
  const [quantity, setQuantity] = useState(item.quantity);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleUpdateQuantity = async (quantity: number) => {
    if (!isAuthenticated) {
      dispatch(
        updateAmountOfProduct({
          id: product._id,
          size: item.size,
          quantity: quantity,
        }),
      );
      return;
    }

    try {
      const { cart, success } = await dispatch(
        fetchUpdateQuantity({ productId: product._id, size: item.size, quantity: quantity }),
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

  const product = item.productId as Product;
  const img = cld.image(product.images.mainImg);

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
        <AdvancedImage
          cldImg={img}
          plugins={[lazyload(), responsive(), placeholder()]}
          style={{ width: '100px' }}
          alt={product.name}
        />
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: 500 }}>
        <Link href={`/shop/products/${product._id}`}>{product.name}</Link>
      </TableCell>
      <TableCell align="center">{printNumberWithCommas(product.price)} đ</TableCell>
      <TableCell align="center">{item.size}</TableCell>
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
      <TableCell align="center">{printNumberWithCommas(product.price * item.quantity)}đ</TableCell>
    </TableRow>
  );
}

export default CartTableItem;
