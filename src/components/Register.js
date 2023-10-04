import React from 'react'
import { useForm } from '../hooks/useForm'
import { TableGrid } from './TableGrid'


export const Register = () => {

    const [formValues, handleInputChange, reset] = useForm({
        data: ''
    })

    const { data } = formValues;

  return (
    <>
        <h2>Registrar Asistencia</h2>

        <input
            type='text'
            placeholder='Escanea el pase de entrada'
            style={{width: 'auto', marginTop: '15px'}}
            name='data'
            value={ data }
            onChange={ handleInputChange }
            autoComplete='off'
        />

        <div className='mt-4' style={{marginBottom: '70px'}}>
            <TableGrid/>
        </div>
    </>
  )
}
