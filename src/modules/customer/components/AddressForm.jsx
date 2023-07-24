import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import { checkValidVietNamPhoneNumber } from '@/common/utility/checkVietNamPhoneNumber';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFAutocomplete from '@/common/components/Form/RHFAutocomplete';
import { useCallback, useEffect, useState } from 'react';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddAddress, fetchEditAddress, selectCurrentUser } from '@/redux/slices/auth';

let addressesDataSource;
let city;

function AddressForm({ selectedAddress, onClose, onSubmitForm }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const isEditMode = selectedAddress ? true : false;

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const getProvinceData = useCallback(async () => {
    const response = await fetch('https://provinces.open-api.vn/api/?depth=3');
    const data = await response.json();
    addressesDataSource = data;
    const formattedCities = data.map((item) => item.name);
    setCities(formattedCities);

    if (isEditMode) {
      const selectedCity = addressesDataSource.find((city) => city.name === selectedAddress.city);
      city = selectedCity;
      const formattedDistricts = selectedCity.districts.map((district) => district.name);
      setDistricts(formattedDistricts);

      const selectedDistrict = city.districts.find((district) => district.name === selectedAddress.district);
      const formattedWards = selectedDistrict.wards.map((ward) => ward.name);
      setWards(formattedWards);
    }
  }, [isEditMode, selectedAddress]);

  useEffect(() => {
    getProvinceData();
  }, [getProvinceData]);

  const AddAddressSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
        return checkValidVietNamPhoneNumber(phoneNumber);
      }),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    cities: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    districts: Yup.string().required('Vui lòng chọn quận/huyện'),
    wards: Yup.string().required('Vui lòng chọn phường/xã'),
  });

  const defaultValues = {
    name: selectedAddress?.name || '',
    email: currentUser?.email || '',
    phone: selectedAddress?.phone || '',
    address: selectedAddress?.detail || '',
    cities: selectedAddress?.city || '',
    districts: selectedAddress?.district || '',
    wards: selectedAddress?.ward || '',
  };

  const methods = useForm({
    resolver: yupResolver(AddAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    resetField,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const handleAddAddress = async (address) => {
    const { success, message } = await dispatch(fetchAddAddress(address)).unwrap();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleEditAddress = async (updatedAddress) => {
    const { success, message } = await dispatch(fetchEditAddress(updatedAddress)).unwrap();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const onSubmit = async (values) => {
    if (onSubmitForm) {
      onSubmitForm(values);
      return;
    }

    onClose();
    const { name, phone, address, cities, districts, wards } = values;
    const enteredAddress = {
      name,
      phoneNumber: phone,
      detail: address,
      city: cities,
      district: districts,
      ward: wards,
    };

    if (selectedAddress) {
      enteredAddress._id = selectedAddress._id;
      await handleEditAddress(enteredAddress);
    } else {
      await handleAddAddress(enteredAddress);
    }
  };

  const handleChangeCity = async () => {
    resetField('districts', { defaultValue: '' });
    resetField('wards', { defaultValue: '' });

    const selectedCityName = getValues('cities');
    const selectedCity = addressesDataSource.find((city) => city.name === selectedCityName);
    city = selectedCity;
    const formattedDistricts = selectedCity.districts.map((district) => district.name);
    setDistricts(formattedDistricts);
  };

  const handleChangeDistrict = async () => {
    resetField('wards', { defaultValue: '' });

    const selectedDistrictName = getValues('districts');
    const selectedDistrict = city.districts.find((district) => district.name === selectedDistrictName);
    const formattedWards = selectedDistrict.wards.map((ward) => ward.name);
    setWards(formattedWards);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
      <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />
      <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
      <RHFTextField name="address" label="Địa chỉ" id="address" placeholder="Địa chỉ" />
      <RHFAutocomplete
        name="cities"
        label="Tỉnh/Thành phố (*)"
        options={cities}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeCity}
      />

      <RHFAutocomplete
        name="districts"
        label="Quận/Huyện (*)"
        options={districts}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeDistrict}
      />

      <RHFAutocomplete
        name="wards"
        label="Phường/Xã (*)"
        options={wards}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        sx={{ mt: 4, mb: 2 }}
      />

      <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1 }}>
        {onSubmitForm ? 'Thanh toán' : isEditMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
      </LoadingButton>
    </FormProvider>
  );
}

export default AddressForm;
