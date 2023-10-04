import { initValuesFormJordanaErrors } from "../components/initValues/initValuesFormJornada";

export const validarFormatoCrearRegistro = ( values ) => {
    let errors = initValuesFormJordanaErrors;
    if( values.matricula === '' ) {
        errors = { ...errors, 'matricula': { ...errors.matricula, error: true } }
    } 

    let isOK = true;
    for( const [ key, value ] of Object.entries( errors ) ) {
        if( value.error ) {
            isOK = false;
            break;
        }
    }

    return {
        errors,
        isOK
    }
    
}