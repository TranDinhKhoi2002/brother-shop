import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, IconButton, Stack, Theme, Tooltip, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { printNumberWithCommas } from '@/utils/common';
import { Product } from '@/types/product';
import { cld } from '@/utils/cloudinary';
import useAuth from '@/hooks/useAuth';
import useLoginModal from '@/hooks/useLoginModal';
import { useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';
import { useWishlist } from '@/hooks/useWishlist';

type ProductItemProps = {
  product: Product;
  forDetail?: boolean;
};

function ProductItem({ product, forDetail }: ProductItemProps): ReactElement {
  const isAuthenticated = useAuth();
  const { onOpenModal, render: renderLoginModal } = useLoginModal();
  const theme = useTheme<Theme>();
  const currentUser = useSelector(selectCurrentUser);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const { handleAddToWishlist: addToWishlist, handleRemoveFromWishlist: removeFromWishlist } = useWishlist();

  const mainImg = cld.image(product.images.mainImg);
  const subImg = cld.image(product.images.subImg);

  useEffect(() => {
    const isAdded = currentUser
      ? currentUser.wishlist.findIndex((item) => (item as Product)._id === product._id) !== -1
      : false;
    setIsAddedToWishlist(isAdded);
  }, [currentUser, product._id]);

  const renderDetailInfor = () => {
    return (
      <div className="font-normal ml-1">
        <Tooltip title={product.name}>
          <p className="line-clamp-1 font-semibold">{product.name}</p>
        </Tooltip>
        {renderBasicInfor()}
      </div>
    );
  };

  const renderBasicInfor = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {renderPrice()}
        <Tooltip title="Thêm vào danh sách yêu thích">
          <IconButton>
            {isAddedToWishlist ? (
              <FavoriteIcon sx={{ color: theme.palette.error.light }} onClick={handleRemoveFromWishlist} />
            ) : (
              <FavoriteBorderIcon onClick={handleAddToWishlist} />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };

  const renderPrice = () => {
    if (product.oldPrice) {
      return (
        <Box sx={{ fontSize: { xs: '12px', md: '13px' }, fontWeight: 'bold' }}>
          <strong className="line-through">{printNumberWithCommas(product.oldPrice)}đ</strong>
          <strong className="ml-1 text-[#ff0000]">{printNumberWithCommas(product.price)}đ</strong>
        </Box>
      );
    }

    return (
      <Typography sx={{ fontSize: { xs: '12px', md: '13px' }, fontWeight: 'bold' }}>
        {printNumberWithCommas(product.price)}đ
      </Typography>
    );
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      onOpenModal();
      return;
    }

    addToWishlist(product._id, () => {
      setIsAddedToWishlist(true);
    });
  };

  const handleRemoveFromWishlist = async () => {
    removeFromWishlist(product._id, () => {
      setIsAddedToWishlist(false);
    });
  };

  return (
    <>
      <div className="group flex relative overflow-hidden pb-[12px]">
        <div className="group-hover:translate-x-[-100%] transition-all duration-700 ease-in-out cursor-pointer">
          <Link href={`/shop/products/${product._id}`}>
            <AdvancedImage cldImg={mainImg} plugins={[responsive(), placeholder()]} />
          </Link>
        </div>
        <div className="w-full absolute right-[-300%] group-hover:right-0 transition-all duration-700 ease-in-out cursor-pointer">
          <Link href={`/shop/products/${product._id}`}>
            <AdvancedImage cldImg={subImg} plugins={[lazyload(), responsive(), placeholder()]} />
          </Link>
        </div>
      </div>
      {forDetail ? renderDetailInfor() : renderPrice()}
      {renderLoginModal()}
    </>
  );
}

export default ProductItem;
