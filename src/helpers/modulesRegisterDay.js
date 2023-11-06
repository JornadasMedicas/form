export const setDay = (rws, rows) => {
    rws.forEach( partner => {
        let nombre = partner.nombre + ' ' + partner.apellido

        if (partner.isAssistDay1){
            rows.push({
                name: nombre,
                email: partner.email,
                tel: partner.tel,
                modulo: partner.modulo,
                day: 23
            })
        }

        if (partner.isAssistDay2){
            rows.push({
                name: nombre,
                email: partner.email,
                tel: partner.tel,
                modulo: partner.modulo,
                day: 24
            })
        }

        if (partner.isAssistDay3){
            rows.push({
                name: nombre,
                email: partner.email,
                tel: partner.tel,
                modulo: partner.modulo,
                day: 25
            })
        }
    })

    return rows;
}