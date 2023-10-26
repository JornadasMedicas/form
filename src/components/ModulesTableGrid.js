import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 60},
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo', flex: 1 },
    { field: 'tel', headerName: 'Teléfono', flex: 1 },
    {
        field: 'modulo', headerName: 'Módulo', flex: 1 },
    { field: 'day', headerName: 'Día', flex: 1 }
];

export const ModulesTableGrid = (invitados) => {

    let rows = [];
    

    /* useEffect(() => {
        console.log(invitados);
    }, [invitados]) */

    /* if (invitados.value.length > 0) {
        rows = [
            { id: '1', email: invitados.value[0][1], rfc: invitados.value[0][0], modulo: invitados.value[0][2], tel: invitados.value[0][3], matricula: invitados.value[0][4]}
        ];
    } */

    
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
