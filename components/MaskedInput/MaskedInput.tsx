import React from 'react';
import ReactInputMask from 'react-input-mask';

export interface propMask {
  className: any;
  field: any;
  mask?: string;
  placeholder?: any;
  onBlur?: any;
}

const onlyNumbers = (str: any) => str.replace(/[^0-9]/g, '');

const MaskedInput: React.FC<propMask> = ({
  className,
  field,
  mask = "999.999.999-99",
  placeholder = "",
  onBlur = () => {}
}: propMask) => {


  return (
    <ReactInputMask
      {...field}
      placeholder={placeholder}
      className={className}
      mask={mask}
      onBlur={onBlur}
    />
  );
};

export default MaskedInput;
