import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { fetchAssists } from '../services/registrosHelpers';
import { setDay } from '../helpers/modulesRegisterDay';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Nombre', width: 150, flex: 2 },
    { field: 'email', headerName: 'Correo', flex: 2 },
    { field: 'tel', headerName: 'Teléfono', flex: 1 },
    {
        field: 'modulo', headerName: 'Módulo', flex: 1
    },
    { field: 'day', headerName: 'Día', flex: 1 }
];

export const ModulesTableGrid = ({ assistModules }) => { //IMPORTANT!!! use destructuring to aim array directly and listen to changes made over it, NOT object
    const [rws, setRws] = useState([])

    let rows = [];

    /* useEffect(() => { //every time page is reload retrieves assistants
        const getAssists = async () => {
            let assists = await fetchAssists();
            setRws(assists);
        }

        getAssists();
    }, []) */

    useEffect(() => { //every time an assistant is registered, retrieves assistants
        if (assistModules.length > 0) {
            const getAssists = async () => {
                let assists = await fetchAssists();
                setRws(assists);
            }

            getAssists();
        }

    }, [assistModules])


    if (rws.length > 0) {
        rows = setDay(rws, rows)
        rows.forEach((partner, i) => {
            partner.id = i + 1
        });
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
            />
        </div>
    )
}
