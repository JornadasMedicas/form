import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { fetchModules } from '../api/congressAPI';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo', flex: 1 },
    { field: 'tel', headerName: 'Teléfono', flex: 1 },
    {
        field: 'modulo', headerName: 'Módulo', flex: 1
    },
    { field: 'day', headerName: 'Día', flex: 1 }
];

export const ModulesTableGrid = (invitados) => {
    const [rws, setRws] = useState([])

    let rows = [];

    if (invitados.value.length > 0) {

        invitados.value.forEach(partner => {
            let nombre = partner.nombre + ' ' + partner.apellido
            rows.push({
                id: invitados.value.indexOf(partner) + 1,
                name: nombre,
                email: partner.email,
                tel: partner.tel,
                modulo: 'Químicos',
                day: partner.day
            })
        });
    }

    useEffect(() => {
        const modules = async () => {
            const asistentes = await fetchModules();
            setRws(asistentes);
        }

        modules();
    }, [])

    console.log(rws);
    

    return (
        <div style={{ height: 375, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                loading={rows.length === 0 ? true : false}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}
