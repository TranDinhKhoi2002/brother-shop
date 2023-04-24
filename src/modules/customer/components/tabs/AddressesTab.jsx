import Button from '@/common/components/UI/Button';
import { selectCurrentUser } from '@/redux/slices/auth';
import { Box, Button as ButtonMUI, Divider, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import AddAddressModal from '../AddAddressModal';

function AddressesTab() {
  const [showAddAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();

  const currentUser = useSelector(selectCurrentUser);

  const theme = useTheme();

  const handleUpdateAddress = (item) => {
    console.log(item);
    setShowAddressModal(true);
    setSelectedAddress(item);
  };

  return (
    <>
      <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Box>
            <Typography variant="h5">Địa chỉ giao hàng</Typography>
            <Typography variant="body1" sx={{ mt: '6px' }}>
              Quản lý thông tin những địa chỉ giao hàng của bạn
            </Typography>
          </Box>
          <Button className="text-xs px-3 h-10 mt-3 md:mt-0" onClick={() => setShowAddressModal(true)}>
            <AddIcon sx={{ mr: 1 }} /> Thêm địa chỉ mới
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {currentUser?.address.map((item, index) => (
          <Fragment key={index}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              sx={{ mt: 3 }}
              spacing={{ md: 8 }}
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                  <Divider orientation="vertical" sx={{ height: 20, backgroundColor: theme.palette.grey[400] }} />
                  <Typography style={{ color: theme.palette.grey[700] }}>{item.phone}</Typography>
                </Stack>
                <Typography style={{ color: theme.palette.grey[700] }}>
                  {item.detail}, {item.ward}, {item.district}, {item.city}
                </Typography>
                {item.isDefault && (
                  <Box sx={{ border: `1px solid ${theme.palette.grey[900]}`, display: 'inline-block', px: 1, mt: 1 }}>
                    <Typography>Mặc định</Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ mt: { xs: 1, md: 0 } }}>
                <ButtonMUI onClick={handleUpdateAddress.bind(this, item)}>Chỉnh sửa</ButtonMUI>
                <ButtonMUI sx={{ color: theme.palette.error.main }}>Xóa</ButtonMUI>
              </Box>
            </Stack>

            {index !== currentUser.address.length - 1 && <Divider sx={{ my: 1 }} />}
          </Fragment>
        ))}
      </Box>

      <AddAddressModal
        isVisible={showAddAddressModal}
        address={selectedAddress}
        onClose={() => setShowAddressModal(false)}
      />
    </>
  );
}

export default AddressesTab;
