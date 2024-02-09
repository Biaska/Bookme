import React from 'react';

interface PhoneInputProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ state, setState }) => {

    function formatPhoneNumber(input: EventTarget & HTMLInputElement) {
        let phoneNumber = input.value.replace(/\D/g, '').substring(0, 10);

        if (6 > phoneNumber.length && phoneNumber.length >= 3) {
          phoneNumber = `(${phoneNumber.substring(0, 3)})-${phoneNumber.substring(3)}`;
        } else if (phoneNumber.length >= 6) {
          phoneNumber = `(${phoneNumber.substring(0, 3)})-${phoneNumber.substring(3,6)}-${phoneNumber.substring(6)}`;
        }
    
        setState(phoneNumber);
      }

    return (
            <input 
                type="tel" 
                id="phone" 
                value={state} 
                onChange={(e)=>formatPhoneNumber(e.target)}
                pattern="\(\d{3}\)-\d{3}-\d{4}"
                />
    )
}