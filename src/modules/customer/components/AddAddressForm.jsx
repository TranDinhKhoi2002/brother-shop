import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import { checkValidVietNamPhoneNumber } from '@/utils/validations';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFAutocomplete from '@/common/components/Form/RHFAutocomplete';
import { useCallback, useEffect, useState } from 'react';
import LoadingButton from '@/common/components/UI/LoadingButton';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchAddAddress, fetchEditAddress } from '@/redux/slices/auth';

function AddAddressForm({ selectedAddress, onClose }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [isEditMode, setIsEditMode] = useState(selectedAddress ? true : false);

  const dispatch = useDispatch();

  const getProvinceData = useCallback(async (type, url) => {
    const provincesData = await fetch(url);
    const response = await provincesData.json();

    switch (type) {
      case 'cities':
        setCities(response.results);
        break;
      case 'districts':
        setDistricts(response.results);
        break;
      case 'wards':
        setWards(response.results);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    getProvinceData('cities', 'https://vapi.vnappmob.com/api/province/');
  }, [getProvinceData]);

  const AddAddressSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
        return checkValidVietNamPhoneNumber(phoneNumber);
      }),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    cities: isEditMode
      ? Yup.string().required('Vui lòng chọn tỉnh/thành phố')
      : Yup.object().required('Vui lòng chọn tỉnh/thành phố'),
    districts: isEditMode
      ? Yup.string().required('Vui lòng chọn quận/huyện')
      : Yup.object().required('Vui lòng chọn quận/huyện'),
    wards: isEditMode
      ? Yup.string().required('Vui lòng chọn phường/xã')
      : Yup.object().required('Vui lòng chọn phường/xã'),
  });

  const defaultValues = {
    name: selectedAddress?.name || '',
    phone: selectedAddress?.phone || '',
    address: selectedAddress?.detail || '',
    cities: selectedAddress?.city,
    districts: selectedAddress?.district,
    wards: selectedAddress?.ward,
  };

  const methods = useForm({
    resolver: yupResolver(AddAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    resetField,
    getValues,
    setValue,
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
    // onClose();
    const { name, phone, address, cities, districts, wards } = values;
    const enteredAddress = {
      name,
      phoneNumber: phone,
      detail: address,
      city: cities.province_name,
      district: districts.district_name,
      ward: wards.ward_name,
    };

    if (selectedAddress) {
      console.log(selectedAddress);
      enteredAddress._id = selectedAddress._id;
      await handleEditAddress(enteredAddress);
    } else {
      await handleAddAddress(enteredAddress);
    }
  };

  const handleChangeCity = async () => {
    resetField('districts');
    resetField('wards');

    setValue('districts', '');
    setValue('wards', '');

    setIsEditMode(false);

    const selectedCity = getValues('cities');
    const url = `https://vapi.vnappmob.com/api/province/district/${selectedCity.province_id}`;
    await getProvinceData('districts', url);
  };

  const handleChangeDistrict = async () => {
    resetField('wards');
    setValue('wards', '');

    const selectedDistrict = getValues('districts');
    const url = `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.district_id}`;
    await getProvinceData('wards', url);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
      <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
      <RHFTextField name="address" label="Địa chỉ" id="address" placeholder="Địa chỉ" />
      <RHFAutocomplete
        name="cities"
        label="Tỉnh/Thành phố (*)"
        options={cities}
        getOptionLabel={(option) => option.province_name || option || ''}
        isOptionEqualToValue={(option, value) =>
          option.province_name === value.province_name || option.province_name === value
        }
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeCity}
      />

      <RHFAutocomplete
        name="districts"
        label="Quận/Huyện (*)"
        options={districts}
        getOptionLabel={(option) => option.district_name || option || ''}
        isOptionEqualToValue={(option, value) =>
          option.district_name === value.district_name || option.district_name === value
        }
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeDistrict}
      />

      <RHFAutocomplete
        name="wards"
        label="Phường/Xã (*)"
        options={wards}
        getOptionLabel={(option) => option.ward_name || option || ''}
        isOptionEqualToValue={(option, value) => option.ward_name === value.ward_name || option.ward_name === value}
        sx={{ mt: 4, mb: 2 }}
      />

      <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
        {isEditMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
      </LoadingButton>
    </FormProvider>
  );
}

export default AddAddressForm;
