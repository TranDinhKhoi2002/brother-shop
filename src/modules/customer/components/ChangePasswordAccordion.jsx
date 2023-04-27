import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';
import Button from '@/common/components/Buttons/Button';
import { changePassword } from '@/services/customerRequests';
import { toast } from 'react-toastify';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function ChangePasswordAccordion({ onValidatePhone }) {
  const [expanded, setExpanded] = useState('panel1');

  const currentUser = useSelector(selectCurrentUser);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .test('equal', 'Xác nhận mật khẩu không chính xác', function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { success } = await changePassword({ newPassword: values.password });
    if (success) {
      toast.success('Đổi mật khẩu thành công');
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ fontWeight: 'bold' }}>Đổi mật khẩu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {currentUser?.verified ? (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name="password"
                    label="Mật khẩu mới"
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="flex-end">
                <LoadingButton loading={isSubmitting} type="submit">
                  Lưu
                </LoadingButton>
              </Stack>
            </FormProvider>
          ) : (
            <Box>
              <Typography>Vui lòng xác thực số điện thoại của bạn trước khi thiết lập mật khẩu.</Typography>
              <Button className="mt-3" onClick={onValidatePhone}>
                Thêm số điện thoại
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ChangePasswordAccordion;
