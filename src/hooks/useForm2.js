import React, { useState } from 'react';
const useForm2 = ( initialState ) => {
    const [ values, setValues ] = useState( initialState );

    const handleInputChange = ( aditionalValue, name) => {
        // console.log( 'DISPARANDP CAMBIO DE ESTADO' );
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