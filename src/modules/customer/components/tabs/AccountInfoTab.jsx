import { Box, Divider, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';

import React, { useEffect, useRef, useState } from 'react';
import ChangePasswordAccordion from '../ChangePasswordAccordion';
import dayjs from 'dayjs';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateProfile, fetchVerifyUser, selectCurrentUser } from '@/redux/slices/auth';
import { checkValidVietNamPhoneNumber } from '@/common/utility/checkVietNamPhoneNumber';
import { updateProfile, verifyPhoneNumber } from '@/services/customerRequests';
import { toast } from 'react-toastify';
import PhoneValidationModal from '../PhoneValidationModal';
import GenderRadioButtonsGroup from '../GenderRadioButtonsGroup';

let receivedOtpCode;

function AccountInfoTab() {
  const currentUser = useSelector(selectCurrentUser);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const genderRef = useRef();

  const dispatch = useDispatch();

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
    const selectedGender = genderRef.current.getSelectedGender();

    const { success, message } = await dispatch(
      fetchUpdateProfile({
        name,
        phoneNumber: phone,
        birthday: new Date(birthday).toISOString(),
        gender: selectedGender,
      }),
    ).unwrap();

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const sendOTPCode = async () => {
    setShowPhoneModal(true);

    const { success, message, otpCode } = await verifyPhoneNumber({ phoneNumber: currentUser?.phone });

    if (success) {
      receivedOtpCode = otpCode.toString();
      toast.success(message);
    }
  };

  const handleSubmitOtpCode = async (enteredOTP) => {
    if (enteredOTP !== receivedOtpCode.toString()) {
      toast.error('Mã xác minh không đúng');
      return;
    }

    setShowPhoneModal(false);
    const { success, message } = await dispatch(fetchVerifyUser()).unwrap();
    if (success) {
      receivedOtpCode = undefined;
      toast.success(message);
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
          <LoadingButton loading={isSubmitting} sx={{ mt: 3 }} type="submit">
            Cập nhật thông tin
          </LoadingButton>
        </FormProvider>
        <ChangePasswordAccordion onValidatePhone={sendOTPCode} />
      </Box>
      <PhoneValidationModal
        isVisible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSubmit={handleSubmitOtpCode}
      />
    </>
  );
}

export default AccountInfoTab;
