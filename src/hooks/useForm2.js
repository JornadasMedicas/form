import { useState } from 'react';

const useForm2 = ( initialState ) => {
    
    const [ values, setValues ] = useState( initialState );

    const handleInputChange = ( aditionalValue, name) => {
        
        setValues( ( prevValues ) => ({
            ...prevValues,
            [ name ] : aditionalValue
        }) );
    }

    const reset = () => {
        setValues( initialState );
    }

    return { values, handleInputChange, reset };
}

export default useForm2;