import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { ReactElement } from 'react';

type RHFAutocompleteProps = {
  name: string;
  onChangeValue?: Function;
  label: string;
};

export default function RHFAutocomplete({ name, ...other }: RHFAutocompleteProps): ReactElement {
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
            options={[]}
            onChange={(_, value) => {
              field.onChange(value);
              if (other.onChangeValue) other.onChangeValue();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={other.label}
                value={field.value}
                error={!!error}
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
