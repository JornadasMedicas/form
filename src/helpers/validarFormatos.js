import { initValuesFormJordanaErrors } from "../components/initValues/initValuesFormJornada";

function validateEmail( email ){
                
	// Get our input reference.
	var emailField = email
	
	// Define our regular expression.
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	// Using test we can check if the text match the pattern
	if( validEmail.test(emailField) ){
		return true;
	}else{
		return false;
	}
} 

export const validarFormatoCrearRegistro = ( values ) => {
    let errors = initValuesFormJordanaErrors;
    if( values.matricula.length > 0) {
        if( values.matricula.length != 4 ) {
            errors = { ...errors, 'matricula': { ...errors.matricula, error: true, msg: "La matrícula no es válida"} }
        } else if( isNaN(values.matricula) ) {
            errors = { ...errors, 'matricula': { ...errors.matricula, error: true, msg: "La matrícula no es válida"} }
        }
    }

    if( values.acronimo === '' || values.acronimo.length < 2) {
        errors = { ...errors, 'acronimo': { ...errors.acronimo, error: true } }
    }

    if( values.nombre === '' || values.nombre.length < 2) {
        errors = { ...errors, 'nombre': { ...errors.nombre, error: true } }
    }

    if( values.apellido === '' || values.apellido.length < 2) {
        errors = { ...errors, 'apellido': { ...errors.apellido, error: true } }
    }

    if( values.rfc === '' || values.rfc.length != 13) {
        errors = { ...errors, 'rfc': { ...errors.rfc, error: true } }
    }

    if( !validateEmail(values.email) ) {
        errors = { ...errors, 'email': { ...errors.email, error: true, msg: "El correo electrónico no es válido"} }
    }

    if( values.tel === '') {
        errors = { ...errors, 'tel': { ...errors.tel, error: true } }
    } else if( values.tel.length != 10 ) {
        errors = { ...errors, 'tel': { ...errors.tel, error: true, msg: "El numero telefónico es incorrecto (ej. 228XXXXXXX)"} }
    } else if( isNaN(values.tel) ) {
        errors = { ...errors, 'tel': { ...errors.tel, error: true, msg: "El numero telefónico es incorrecto (ej. 228XXXXXXX)"} }
    }

    if( values.modulo === '') {
        errors = { ...errors, 'modulo': { ...errors.modulo, error: true } }
    }

    if( values.ciudad === '') {
        errors = { ...errors, 'ciudad': { ...errors.ciudad, error: true } }
    }

    if( values.escuela === '') {
        errors = { ...errors, 'escuela': { ...errors.escuela, error: true } }
    }

    let isOK = true;
    for( const [ key, value ] of Object.entries( errors ) ) {
        if( value.error ) {
            isOK = false;
        }
    }

    return {
        errors,
        isOK
    }
    
}