import { useState } from 'react';

const useFormRegister = ( initialState ) => {
    
    const [ values, setValues ] = useState( initialState );

    const handleInputChange = ( aditionalValue, name) => {
        
        setValues( ( prevValues ) => ({
            ...prevValues,
            [ name ] : aditionalValue
        }) );
    }

    const reset = () => {
        setValues( ( prevValues ) => ({
            ...prevValues,
            qrdata: '',
            emaildata: ''
        }));
    }

    return { values, handleInputChange, reset };
}

export default useFormRegister;