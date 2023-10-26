import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 60},
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo', flex: 1 },
    { field: 'tel', headerName: 'Teléfono', flex: 1 },
    {
        field: 'workshop', headerName: 'Taller', flex: 1 },
    { field: 'day', headerName: 'Día', flex: 1 }
];

export const WorkshopsTableGrid = () => {

    let rows = [];

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