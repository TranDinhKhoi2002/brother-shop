import { Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { ReactElement, useEffect, useState } from 'react';
import { printNumberWithCommas } from '@/utils/common';
import Link from 'next/link';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { cld } from '@/utils/lib/cloudinary';
import useCart from '@/hooks/useCart';

type CartTableItemProps = {
  item: CartItem;
  labelId: string;
  isItemSelected: boolean;
  onClick: (_event: any, _item: CartItem) => void;
};

function CartTableItem({ item, labelId, isItemSelected, onClick }: CartTableItemProps): ReactElement {
  const [quantity, setQuantity] = useState(item.quantity);
  const { handleUpdateQuantity: updateQuantity } = useCart();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleUpdateQuantity = async (quantity: number) => {
    updateQuantity(product._id, item.size, quantity);
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
