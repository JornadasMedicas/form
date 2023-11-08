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

export const MedTableComponent = () => {
    const [rws, setRws] = useState([])

    let rows = [];

    /* useEffect(() => { //every time page is reload retrieves assistants
        const getAssists = async () => {
            console.log("ENTRA");
            await fetchWorkshopAssists();
            let filtered = assists.filter(assist => assist.isMedWorkshop || assist.isStomaWorkshop1 || assist.isStomaWorkshop2 || assist.isStomaWorkshop3)
            console.log(filtered);
            setRws(assists);
        }

        getAssists();
    }, []) */

    /* useEffect(() => { //every time an assistant is registered, retrieves assistants
        if (assistModules.length > 0) {
            const getAssists = async () => {
                let assists = await fetchAssists();
                setRws(assists);
            }

            getAssists();
        }

    }, [assistModules]) */

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
        />
    </div>
  )
}
