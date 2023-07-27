import React, { ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';

interface Props {
  children?: ReactNode;
}

export type Ref = {
  getSelectedGender: () => string;
};

const GenderRadioButtonsGroup = React.forwardRef<Ref, Props>(function GenderRadioButtonsGroup(props, ref) {
  const currentUser = useSelector(selectCurrentUser);
  const [selectedGender, setSelectedGender] = useState(currentUser?.gender || 'Nam');

  useEffect(() => {
    if (currentUser) {
      setSelectedGender(currentUser.gender);
    }
  }, [currentUser]);

  useImperativeHandle(ref, () => ({
    getSelectedGender: () => {
      return selectedGender;
    },
  }));

  return (
    <FormControl>
      <FormLabel id="gender-radio-buttons-group">Giới tính</FormLabel>
      <RadioGroup
        value={selectedGender}
        row
        aria-labelledby="gender-radio-buttons-group"
        name="row-radio-buttons-group"
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
        <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
      </RadioGroup>
    </FormControl>
  );
});

export default GenderRadioButtonsGroup;
