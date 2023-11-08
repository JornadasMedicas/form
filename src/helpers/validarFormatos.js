import { initValuesFormJordanaErrors } from "../components/initValues/initValuesFormJornada";

function validateEmail(email) {

    // Get our input reference.
    var emailField = email

    // Define our regular expression.
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if (validEmail.test(emailField)) {
        return true;
    } else {
        return false;
    }
}

export const validarFormatoCrearRegistro = (values) => {
    let errors = initValuesFormJordanaErrors;
    let display = false;

    if ((values.categoria === 'Trabajador CAE' || values.categoria === 'Médico Residente') && values.matricula == '') {
        errors = { ...errors, 'matricula': { ...errors.matricula, error: true } }
    }

    if (values.acronimo === '') {
        errors = { ...errors, 'acronimo': { ...errors.acronimo, error: true} }
    } else if (!values.acronimo.endsWith('.')) {
        errors = { ...errors, 'acronimo': { ...errors.acronimo, error: true, msg: "El acrónimo debe terminar en punto (.)"} }
    }

    if (values.nombre === '' || values.nombre.length < 2) {
        errors = { ...errors, 'nombre': { ...errors.nombre, error: true } }
    }

    if (values.apellido === '' || values.apellido.length < 2) {
        errors = { ...errors, 'apellido': { ...errors.apellido, error: true } }
    }

    if (values.rfc !== '') {
        if (values.rfc.length !== 13) {
            errors = { ...errors, 'rfc': { ...errors.rfc, error: true } }
        }
    }

    if (!validateEmail(values.email)) {
        errors = { ...errors, 'email': { ...errors.email, error: true, msg: "El correo electrónico no es válido" } }
    }

    if (values.tel === '') {
        errors = { ...errors, 'tel': { ...errors.tel, error: true } }
    } else if (values.tel.length !== 10) {
        errors = { ...errors, 'tel': { ...errors.tel, error: true, msg: "El numero telefónico es incorrecto (ej. 228XXXXXXX)" } }
    } else if (isNaN(values.tel)) {
        errors = { ...errors, 'tel': { ...errors.tel, error: true, msg: "El numero telefónico es incorrecto (ej. 228XXXXXXX)" } }
    }

    if (values.ciudad === '') {
        errors = { ...errors, 'ciudad': { ...errors.ciudad, error: true } }
    }

    if ((values.acronimo != '' && values.nombre != '' && values.apellido != '' && values.email != '' && values.tel != '' && values.ciudad != '') && (values.modulo != '' || values.isMedWorkshop === true || values.isStomaWorkshop1 === true || values.isStomaWorkshop2 === true || values.isStomaWorkshop3 === true)) {
        display = true;
    }

    let isOK = true;
    for (const [key, value] of Object.entries(errors)) {
        if (value.error) {
            isOK = false;
        }
    }

    return {
        errors,
        isOK,
        display
    }

}