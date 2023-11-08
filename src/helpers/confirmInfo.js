export const text = (values, talleres) => {
    return {
        title: 'IMPORTANTE',
        html: '<div style="text-align: left;"><b>Verifique sus datos antes de enviar el formulario. Su constancia de participación será enviada a su correo electrónico con los datos proporcionados al finalizar el evento.</b></div><hr>' +
            '<div style="text-align: left;">' +
            '<b>Categoría:</b> ' + values.categoria + '<br>' +
            '<b>Acrónimo:</b> ' + values.acronimo + '<br>' +
            '<b>Nombre:</b> ' + values.nombre + ' ' + values.apellido + '<br>' +
            `<b>RFC:</b> ${values.rfc === '' ? '<b style="color: red;">No aplica</b>' : values.rfc}` + '<br>' +
            '<b>Correo Electrónico:</b> ' + values.email + '<br>' +
            '<b>Teléfono:</b> ' + values.tel + '<br>' +
            '<b>Ciudad:</b> ' + values.ciudad + '<br>' +
            `<b>Institución:</b> ${values.escuela === '' ? '<b style="color: red;">No aplica</b>' : values.escuela}` + '<br>' +
            `<b>Módulo:</b> ${values.modulo != '' ? `<b style="color: red;">${values.modulo}</b>` : '<b style="color: red;">No aplica</b>'}` + '<br>' +
            `<b>Talleres:</b>
            <br>${values.isMedWorkshop === false && values.isStomaWorkshop1 === false && values.isStomaWorkshop2 === false && values.isStomaWorkshop3 === false ? '<b style="color: red;">No aplica</b>' : ''}
            <br>${values.isMedWorkshop === true ? talleres.isMedWorkshop : ''}
            <br>${values.isStomaWorkshop1 === true ? talleres.isStomaWorkshop1 : ''}
            <br>${values.isStomaWorkshop2 === true ? talleres.isStomaWorkshop2 : ''}
            <br>${values.isStomaWorkshop3 === true ? talleres.isStomaWorkshop3 : ''}` + '<br>' +
            '</div>' +
            '<hr><b>¡El Centro de Alta Especialidad Dr. Rafael Lucio no se hace responsable por datos mal proporcionados!</b>',
        icon: 'warning',
        confirmButtonColor: '#fbb373',
        confirmButtonText: 'Entendido',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar'
    }
}