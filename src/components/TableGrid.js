import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'rfc', headerName: 'RFC', width: 130 },
    { field: 'email', headerName: 'Correo Electrónico', width: 195 },
    {
      field: 'modulo', headerName: 'Módulo', width: 130},
    {field: 'tel', headerName: 'Teléfono', width: 100},
    {field: 'matricula', headerName: 'Matrícula', width: 80}
      /* valueGetter: (params) =>
        `${params.row.rfc || ''} ${params.row.email || ''}`, */
  ];
  
  const rows = [
    { id: 1, email: 'rojeru.san1983@gmail.com', rfc: 'MIHO001029IX8', modulo: 'Estomatología', tel: '2281914008', matricula: '7004'},
    { id: 2, email: 'Lannister', rfc: 'Cersei', modulo: 42 },
    { id: 3, email: 'Lannister', rfc: 'Jaime', modulo: 45 },
    { id: 4, email: 'Stark', rfc: 'Arya', modulo: 16 },
    { id: 5, email: 'Targaryen', rfc: 'Daenerys', modulo: 37 },
    { id: 6, email: 'rojeru.san1983@gmail.com', rfc: 'MIHO001029IX8', modulo: 'Estomatología', tel: '2281914008', matricula: '7004'},
    { id: 7, email: 'Lannister', rfc: 'Cersei', modulo: 42 },
    { id: 8, email: 'Lannister', rfc: 'Jaime', modulo: 45 },
    { id: 9, email: 'Stark', rfc: 'Arya', modulo: 16 },
    { id: 10, email: 'Targaryen', rfc: 'Daenerys', modulo: null }
  ];
  

export const TableGrid = () => {
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
        loading={false}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
