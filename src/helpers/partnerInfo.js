export const info = (values) => {
  const name = values.nombre.trim() + ' ' + values.apellido.trim()
  return {
    title: '<h1>Datos del usuario</h1>',
    icon: "info",
    html: '<div style="text-align: left;">' +
      '<b>Nombre:</b> ' + name + '<br>' +
      '<b>Teléfono:</b> ' + values.tel + '<br><hr>' +
      `<b>Módulo:</b> ${values.modulo != ''
        ? (
          `<b style="color: blue;">${values.modulo}</b><br>` +
          `<b>Asistencia:</b><br>` +
          '23 Noviembre: ' + `${values.isAssistDay1 ? '<b style="color: green;">Asistió</b><br>' : '<b style="color: red;">Sin asistir</b><br>'}` +
          '24 Noviembre: ' + `${values.isAssistDay2 ? '<b style="color: green;">Asistió</b><br>' : '<b style="color: red;">Sin asistir</b><br>'}` +
          '25 Noviembre: ' + `${values.isAssistDay3 ? '<b style="color: green;">Asistió</b>' : '<b style="color: red;">Sin asistir</b>'}`
        )
        :
        '<b style="color: red;">No aplica</b>'}` + '<br><hr>' +
      `<b>Talleres:</b> ${values.isMedWorkshop === false && values.isStomaWorkshop1 === false && values.isStomaWorkshop2 === false && values.isStomaWorkshop3 === false 
        ? 
        '<b style="color: red;">No aplica</b>' 
        : (
          `<br>${values.isMedWorkshop === true ? '23 Noviembre: Cuidados Palitativos' + ' - ' + (values.isMedAssistDay1 ? '<b style="color: green;">Asistió</b>' : '<b style="color: red;">Sin asistir</b>') : ''}` +
          `<br>${values.isStomaWorkshop1 === true ? '23 Noviembre: Restauración Interproximales' + ' - ' + (values.isStoma1AssistDay1 ? '<b style="color: green;">Asistió</b>' : '<b style="color: red;">Sin asistir</b>') : ''}` +
          `<br>${values.isStomaWorkshop2 === true ? '24 Noviembre: Paladar Hendido' + ' - ' + (values.isStoma2AssistDay2 ? '<b style="color: green;">Asistió</b>' : '<b style="color: red;">Sin asistir</b>') : ''}` +
          `<br>${values.isStomaWorkshop3 === true ? '24 Noviembre: Cirugía Maxilofacial' + ' - ' + (values.isStoma3AssistDay2 ? '<b style="color: green;">Asistió</b>' : '<b style="color: red;">Sin asistir</b>') : ''}`
        )}` +
      '</div>',
    showCloseButton: true,
    confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Ok
        `
  }
}
