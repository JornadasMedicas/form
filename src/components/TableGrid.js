import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'rfc', headerName: 'RFC', width: 130, flex: 1 },
    { field: 'email', headerName: 'Correo Electrónico', width: 195, flex: 1 },
    {
        field: 'modulo', headerName: 'Módulo', width: 130, flex: 1
    },
    { field: 'tel', headerName: 'Teléfono', width: 100, flex: 1 },
    { field: 'matricula', headerName: 'Matrícula', width: 80, flex: 1 }
];

export const TableGrid = (invitados) => {

    let rows = [];

    if (invitados.value.length > 0) {
        rows = [
            { id: '1', email: invitados.value[0][1], rfc: invitados.value[0][0], modulo: invitados.value[0][2], tel: invitados.value[0][3], matricula: invitados.value[0][4]}
        ];
    }

    
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
