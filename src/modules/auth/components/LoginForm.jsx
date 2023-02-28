import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import Button from '@/common/components/UI/Button';

function LoginForm() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h5 className="text-center font-medium text-xl my-3">Đăng nhập</h5>
      <p className="text-center w-[80%] md:w-[70%] mx-[auto] font-normal mb-4">
        Đăng nhập thành viên để nhận nhiều những chương trình ưu đãi hấp dẫn
      </p>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="username" label="Email/ Số điện thoại" id="username" placeholder="Tên đăng nhập" />
        <RHFTextField name="password" label="Mật khẩu" id="password" placeholder="Mật khẩu" />

        <p className="underline italic text-center">Quên mật khẩu?</p>
        <Button className="w-full my-4">Đăng nhập</Button>
      </FormProvider>
    </div>
  );
}

export default LoginForm;
