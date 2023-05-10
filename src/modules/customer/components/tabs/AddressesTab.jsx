import Button from '@/common/components/Buttons/Button';
import { fetchRemoveAddress, fetchUpdateAddressToDefault, selectCurrentUser } from '@/redux/slices/auth';
import {
  Box,
  Button as ButtonMUI,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import AddAddressModal from '../AddAddressModal';
import ConfirmRemoveModal from '@/common/components/Modal/ConfirmRemoveModal';
import { toast } from 'react-toastify';
import LoadingModal from '@/common/components/Modal/LoadingModal';

function AddressesTab() {
  const [showAddAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const theme = useTheme();

  const handleUpdateAddress = (item) => {
    setShowAddressModal(true);
    setSelectedAddress(item);
  };

  const handleCloseAddressFormModal = () => {
    setSelectedAddress();
    setShowAddressModal(false);
  };

  const handleOpenConfirmModal = (item) => {
    setSelectedAddress(item);
    setShowConfirmRemoveModal(true);
  };

  const handleCloseConfirmModal = () => {
    setSelectedAddress();
    setShowConfirmRemoveModal(false);
  };

  const handleRemoveAddress = async () => {
    handleCloseConfirmModal();
    const { success, message } = await dispatch(fetchRemoveAddress({ _id: selectedAddress._id })).unwrap();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleUpdateToDefault = async (addressId) => {
    setShowLoadingModal(true);

    const { success, message } = await dispatch(fetchUpdateAddressToDefault({ _id: addressId })).unwrap();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setShowLoadingModal(false);
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
                <ButtonMUI sx={{ color: theme.palette.error.main }} onClick={handleOpenConfirmModal.bind(this, item)}>
                  Xóa
                </ButtonMUI>
                {!item.isDefault && (
                  <FormGroup>
                    <FormControlLabel
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleUpdateToDefault(item._id);
                        }
                      }}
                      control={<Checkbox />}
                      label="Mặc định"
                    />
                  </FormGroup>
                )}
              </Box>
            </Stack>

            {index !== currentUser.address.length - 1 && <Divider sx={{ my: 1 }} />}
          </Fragment>
        ))}
      </Box>

      <AddAddressModal
        isVisible={showAddAddressModal}
        address={selectedAddress}
        onClose={handleCloseAddressFormModal}
      />

      <ConfirmRemoveModal
        isOpen={showConfirmRemoveModal}
        title="Xóa địa chỉ?"
        subTitle="Bạn có chắc muốn xóa địa chỉ chứ?"
        onClose={handleCloseConfirmModal}
        onDelete={handleRemoveAddress}
      />

      <LoadingModal isOpen={showLoadingModal} onClose={() => setShowLoadingModal(false)} />
    </>
  );
}

export default AddressesTab;