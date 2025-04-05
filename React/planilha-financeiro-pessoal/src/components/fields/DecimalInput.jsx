import React,{useRef,useEffect,useState} from 'react';
import { TextField } from '@mui/material';  
import {NumericFormat} from 'react-number-format';
import PropTypes from 'prop-types';

const DecimalInput = ({ value, onChange,label,fullWidth=true,
   readOnly = false,disabled = false, ...props }) => {
   const [inputValue, setInputValue] = useState('')
   const inputRef = useRef(null);

   const formatDisplay = (val) => {
      return val !== undefined && val !== null
        ? val.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : '0.00';
    };

   const handleChange = (e) => { 
      let newValue = e.target.value.replace(/[^0-9-]/g, ''); // Allow only numbers and minus
      const isNegative = newValue.startsWith('-');
      newValue = newValue.replace('-', ''); // Remove minus for processing
  
      // Treat input as cents-first, shifting left
      const paddedValue = newValue.padStart(2, '0'); // Ensure at least 2 digits for cents
      const cents = paddedValue.slice(-2);
      const dollars = newValue.length > 2 ? newValue.slice(0, -2) : '0';
      const numericValue = parseFloat(`${dollars}.${cents}`) * (isNegative ? -1 : 1);
      onChange(numericValue)
      // Move cursor to the end after update
      setTimeout(() => {
         if (inputRef.current) {
           inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
         }
       }, 0);
   }

   useEffect(() => {
      if (!inputValue && value === 0) {
        setInputValue(''); // Keep empty if starting fresh
      }
    }, [value]);

 const displayValue = inputValue
 ? (() => {
     const isNegative = inputValue.startsWith('-');
     const digits = inputValue.replace('-', '');
     const padded = digits.padStart(2, '0');
     const cents = padded.slice(-2);
     const dollars = digits.length > 2 ? digits.slice(0, -2) : '0';
     return `${isNegative ? '-' : ''}${dollars}.${cents}`;
   })()
 : formatDisplay(value);


   return( 
      <NumericFormat
         customInput={TextField}
         label={label}
         value={value}
         onChange={handleChange} 
         decimalScale={2}
         fixedDecimalScale={true}
         allowNegative={true}
         placeholder="0.00"      
         fullWidth={fullWidth}   
allowLeadingZeros={false}
         inputProps={{ inputMode: 'decimal' ,style: { textAlign: 'right' }}}
         {...props}
      />
   );
}



DecimalInput.propTypes = {
   value: PropTypes.number,
   onChange: PropTypes.func.isRequired,
   readOnly: PropTypes.bool,
   label: PropTypes.string,
   name: PropTypes.string,
   disabled: PropTypes.bool,
   fullWidth: PropTypes.bool,
   sx: PropTypes.object,
 };

export default DecimalInput;