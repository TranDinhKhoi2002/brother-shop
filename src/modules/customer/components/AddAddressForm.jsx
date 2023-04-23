import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '@/common/components/Form/FormProvider';
import { checkValidVietNamPhoneNumber } from '@/utils/validations';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFAutocomplete from '@/common/components/Form/RHFAutocomplete';
import { useCallback, useEffect, useState } from 'react';
import LoadingButton from '@/common/components/UI/LoadingButton';

function AddAddressForm({ onAddAddress }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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
    cities: Yup.object().required('Vui lòng chọn tỉnh/thành phố'),
    districts: Yup.object().required('Vui lòng chọn quận/huyện'),
    wards: Yup.object().required('Vui lòng chọn phường/xã'),
  });

  const defaultValues = {
    name: '',
    phone: '',
    address: '',
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

  const onSubmit = async (values) => {
    console.log(values);
    const { name, phone, address, cities, districts, wards } = values;
  };

  const handleChangeCity = async () => {
    resetField('districts');
    resetField('wards');

    const selectedCity = getValues('cities');
    const url = `https://vapi.vnappmob.com/api/province/district/${selectedCity.province_id}`;
    await getProvinceData('districts', url);
  };

  const handleChangeDistrict = async () => {
    resetField('wards');

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
        getOptionLabel={(option) => option.province_name || ''}
        isOptionEqualToValue={(option, value) => option.province_name === value.province_name}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeCity}
      />

      <RHFAutocomplete
        name="districts"
        label="Quận/Huyện (*)"
        options={districts}
        getOptionLabel={(option) => option.district_name || ''}
        isOptionEqualToValue={(option, value) => option.district_name === value.district_name}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeDistrict}
      />

      <RHFAutocomplete
        name="wards"
        label="Phường/Xã (*)"
        options={wards}
        getOptionLabel={(option) => option.ward_name || ''}
        isOptionEqualToValue={(option, value) => option.ward_name === value.ward_name}
        sx={{ mt: 4, mb: 2 }}
      />

      <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1, fontWeight: 400 }}>
        Thêm địa chỉ
      </LoadingButton>
    </FormProvider>
  );
}

export default AddAddressForm;
