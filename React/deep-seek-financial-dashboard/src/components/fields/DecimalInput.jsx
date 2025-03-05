import React from 'react';
import { TextField } from '@mui/material'; 
const DecimalInput = ({ value, onChange,label, ...props }) => {

   const handleInputChange = (event) => {
      let inputValue = event.target.value;
    inputValue = inputValue.replace(',', '.');
    const decimalRegex = /^-?\d*\.?\d{0,2}$/;

    if (inputValue === '' || inputValue === '-' || decimalRegex.test(inputValue)) {
      onChange(event);  
    }
   }

   return(
   <TextField
      label={label}
      fullWidth 
      value={value}
      onChange={handleInputChange}
      variant="outlined"
      placeholder="0.00"
      inputProps={{
         inputMode: 'decimal',
         pattern: '-?[0-9]*\\.?[0-9]{0,2}',
       }}
      {...props}
      />
   );
}
export default DecimalInput;