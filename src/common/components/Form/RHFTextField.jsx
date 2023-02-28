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
            <textarea
              {...field}
              value={field.value || other.text || ''}
              className="block w-full px-3 text-base leading-6 font-normal text-[#495057] bg-[white] bg-clip-padding border-[1px] border-solid border-[#ced4da] rounded-[0.25rem] outline-none transition-all ease-in-out delay-100 focus:border-[var(--primary)] !py-[0.375rem] !h-24"
              {...other}
            />
          ) : (
            <input
              {...field}
              value={field.value || other.text || ''}
              className="block w-full h-[43px] py-0 px-3 text-base leading-6 font-normal text-[#495057] bg-[white] bg-clip-padding border-[1px] border-solid border-[#ced4da] rounded-[0.25rem] outline-none transition-all ease-in-out delay-100 focus:border-[var(--primary)]"
              {...other}
            />
          )}

          {error && <span className="text-primary">{error?.message}</span>}
        </div>
      )}
    />
  );
}
