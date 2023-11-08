import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { fetchWorkshopAssists } from '../services/registrosHelpers';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Nombre', width: 150, flex: 2 },
    { field: 'email', headerName: 'Correo', flex: 2 },
    { field: 'tel', headerName: 'Teléfono', flex: 1 },
    { field: 'workshop', headerName: 'Taller', flex: 1 },
    { field: 'day', headerName: 'Día', flex: 1 }
];

export const Stoma3TableComponent = () => {
  return (
    <div>Stoma3TableComponent</div>
  )
}
