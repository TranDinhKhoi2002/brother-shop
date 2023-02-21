import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label htmlFor={other.id}>
            {label} <span className="text-primary">*</span>
          </label>
          <input {...field} value={field.value || other.text || ''} {...other} />
          {error && <span className="text-primary">{error?.message}</span>}
        </div>
      )}
    />
  );
}
