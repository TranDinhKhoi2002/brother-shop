import { Box, Divider, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import ChangePasswordAccordion from '../ChangePasswordAccordion';
import dayjs from 'dayjs';
import LoadingButton from '@/common/components/UI/LoadingButton';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectFacebookUser, selectGoogleUser } from '@/redux/slices/auth';
import { checkValidVietNamPhoneNumber } from '@/utils/validations';
import { updateProfile } from '@/services/customerRequests';
import { toast } from 'react-toastify';
import PhoneValidationModal from '../PhoneValidationModal';

const GenderRadioButtonsGroup = React.forwardRef(function GenderRadioButtonsGroup(props, ref) {
  const [selectedGender, setSelectedGender] = useState('male');

  useImperativeHandle(ref, () => ({
    getSelectedGender: () => {
      return selectedGender;
    },
  }));

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
      <RadioGroup
        value={selectedGender}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        <FormControlLabel value="male" control={<Radio />} label="Nam" />
        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
      </RadioGroup>
    </FormControl>
  );
});

function AccountInfo() {
  const currentUser = useSelector(selectCurrentUser);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const genderRef = useRef();

  const AccountSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
        return checkValidVietNamPhoneNumber(phoneNumber);
      }),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    birthday: Yup.date().required('Vui lòng chọn ngày sinh'),
  });

  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    birthday: dayjs(new Date()).format('YYYY-MM-DD'),
  };

  const methods = useForm({
    resolver: yupResolver(AccountSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { name, phone, birthday } = values;

    const { success, message } = await updateProfile({ name, phone, birthday: new Date(birthday).toISOString() });
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    reset({
      name: currentUser?.name,
      phone: currentUser?.phone,
      email: currentUser?.email,
      birthday: dayjs(currentUser?.birthday || new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
    });
  }, [currentUser, reset]);

  return (
    <>
      <Box>
        <Typography variant="h5">Thông tin tài khoản</Typography>
        <Typography variant="body1" sx={{ mt: '6px' }}>
          Bạn có thể cập nhật thông tin của mình ở trang này
        </Typography>

        <Divider sx={{ my: 3 }} />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField name="birthday" label="Ngày sinh" id="birthday" placeholder="Ngày sinh" type="date" />
            </Grid>
            <Grid item xs={12} md={6}>
              <GenderRadioButtonsGroup ref={genderRef} />
            </Grid>
          </Grid>
          <LoadingButton loading={isSubmitting} sx={{ fontWeight: 'bold', mt: 3 }} type="submit">
            Cập nhật thông tin
          </LoadingButton>
        </FormProvider>
        <ChangePasswordAccordion onValidatePhone={() => setShowPhoneModal(true)} />
      </Box>
      <PhoneValidationModal isVisible={showPhoneModal} onClose={() => setShowPhoneModal(false)} />
    </>
  );
}

export default AccountInfo;
