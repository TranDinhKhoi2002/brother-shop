import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

RHFDatePicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFDatePicker({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            {...field}
            inputFormat="DD/MM/YYYY"
            value={field.value || other.text}
            renderInput={(params) => <TextField {...params} fullWidth />}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
}
