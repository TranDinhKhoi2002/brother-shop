import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
};

export default function RHFAutocomplete({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value || ''}
            fullWidth
            disableClearable
            onChange={(e, value) => {
              field.onChange(value);
              if (other.onChangeValue) other.onChangeValue();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={other.label}
                value={field.value}
                error={error}
                helperText={error?.message}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
