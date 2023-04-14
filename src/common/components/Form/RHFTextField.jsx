import { TextField, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, label, isRequired = true, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <label htmlFor={other.id} className="inline-block mb-2">
            {label} {isRequired && <span className="text-primary">*</span>}
          </label>
          {other.tag === 'textarea' ? (
            <TextareaAutosize
              {...field}
              value={field.value || other.text || ''}
              minRows={3}
              className="block w-full leading-6 border-[1px] border-solid border-lightGray100 rounded-[0.5rem] py-[16.5px] px-[14px]"
              {...other}
            />
          ) : (
            <TextField {...field} value={field.value || other.text || ''} sx={{ width: '100%' }} {...other} />
          )}

          {error && <span className="text-primary">{error?.message}</span>}
        </div>
      )}
    />
  );
}
