import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import FormProvider from '@/common/components/Form/FormProvider';
import { checkValidVietNamPhoneNumber } from '@/utils/common';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFAutocomplete from '@/common/components/Form/RHFAutocomplete';
import { ReactElement, useEffect, useState } from 'react';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchAddAddress, fetchEditAddress, selectCurrentUser } from '@/redux/slices/auth';
import { Address } from '@/types/customer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AddressPayload } from '@/services/types/customer';
import { getDistricts, getProvinces, getWards } from '@/services/address';

type AddressFormProps = {
  selectedAddress?: Address;
  onClose?: () => void;
  onSubmitForm?: (_values: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cities: string;
    districts: string;
    wards: string;
  }) => void;
};

function AddressForm({ selectedAddress, onClose, onSubmitForm }: AddressFormProps): ReactElement {
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);

  const { data: citiesData } = useQuery({
    queryKey: ['vn_provinces'],
    queryFn: getProvinces,
  });

  const { mutate: fetchDistricts, data: districtsData } = useMutation({
    mutationFn: getDistricts,
    onSuccess: (data) => {
      if (!data) return;
      const districtNames = data.results.map((district: { district_name: string }) => district.district_name);
      setDistricts(districtNames);
    },
  });

  const { mutate: fetchWards } = useMutation({
    mutationFn: getWards,
    onSuccess: (data) => {
      if (!data) return;
      const wardNames = data.results.map((ward: { ward_name: string }) => ward.ward_name);
      setWards(wardNames);
    },
  });

  const { mutate: addAddress } = useMutation({
    mutationFn: (address: AddressPayload) => dispatch(fetchAddAddress(address)).unwrap(),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
    },
  });

  const { mutate: updateAddress } = useMutation({
    mutationFn: (updatedAddress: AddressPayload) => dispatch(fetchEditAddress(updatedAddress)).unwrap(),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
    },
  });

  useEffect(() => {
    if (!citiesData) return;
    const cityNames = citiesData.results.map((province: { province_name: string }) => province.province_name);
    setCities(cityNames);
  }, [citiesData]);

  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isEditMode = !!selectedAddress;

  const AddAddressSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
        return checkValidVietNamPhoneNumber(phoneNumber as string);
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

  const onSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cities: string;
    districts: string;
    wards: string;
  }) => {
    if (onSubmitForm) {
      onSubmitForm(values);
      return;
    }

    onClose?.();
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
      updateAddress({ ...enteredAddress, _id: selectedAddress._id });
    } else {
      addAddress(enteredAddress);
    }
  };

  const handleChangeCity = async () => {
    resetField('districts', { defaultValue: '' });
    resetField('wards', { defaultValue: '' });

    if (!citiesData) return;
    const selectedCityName = getValues('cities');
    const selectedCity = citiesData.results.find(
      (province: { province_name: string }) => province.province_name === selectedCityName,
    );
    fetchDistricts(selectedCity?.province_id);
  };

  const handleChangeDistrict = async () => {
    resetField('wards', { defaultValue: '' });

    if (!districtsData) return;
    const selectedDistrictName = getValues('districts');
    const selectedDistrict = districtsData.results.find(
      (district: { district_name: string }) => district.district_name === selectedDistrictName,
    );
    fetchWards(selectedDistrict?.district_id);
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
        options={cities || []}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeCity}
      />

      <RHFAutocomplete
        name="districts"
        label="Quận/Huyện (*)"
        options={districts}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
        onChangeValue={handleChangeDistrict}
      />

      <RHFAutocomplete
        name="wards"
        label="Phường/Xã (*)"
        options={wards}
        getOptionLabel={(option: string) => option}
        isOptionEqualToValue={(option: string, value: string) => option === value}
        sx={{ mt: 4, mb: 2 }}
      />

      <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1 }}>
        {onSubmitForm ? 'Thanh toán' : isEditMode ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
      </LoadingButton>
    </FormProvider>
  );
}

export default AddressForm;
