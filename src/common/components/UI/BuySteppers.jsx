import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Đăng nhập', 'Thông tin đặt hàng', 'Thanh toán', 'Hoàn tất'];

export default function BuySteppers({ activeStep }) {
  return (
    <Box
      sx={{
        width: '100%',
        marginY: 5,
        '.css-1bqte26-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
          color: '#ee4266',
        },
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
