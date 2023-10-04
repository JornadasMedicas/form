import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import useForm2 from '../hooks/useForm2'
import swal from 'sweetalert2';
import { initValuesFormJordana, initValuesFormJordanaErrors } from './initValues/initValuesFormJornada'
import { validarFormatoCrearRegistro } from '../helpers/validarFormatos'


const modulos = [
	'Medicina',
	'Enfermería',
	'Quimicos',
	'Estomatología'
]

export const Form = () => {
	const [ errors, setErrors ] = useState( initValuesFormJordanaErrors );
	const { values, handleInputChange } = useForm2( initValuesFormJordana );

	const handleSubmit = () => {
		setErrors( initValuesFormJordanaErrors );
		const { isOK, errors } = validarFormatoCrearRegistro( values );
		if( isOK ) {
			alert( 'VA PARA ARRIBA' );
		} else {
			setErrors( errors );
			swal.fire( {
				icon: 'error',
				title: 'Error al guardar formulario',
				text: 'Revisar campos',
				// footer: '<a href="">Why do I have this issue?</a>'
			} );
		}
	}

	const handleInputChangeGrupo = ( e, newValue ) => {
        if( newValue ) {
            handleInputChange( newValue, 'modulo' );        
        }
        else {
            handleInputChange( '', 'modulo' );    
        }    
    }

	return (
		<>
			<Box sx={{ p: 2, marginBottom: '100px' }}>
				<FormControl fullWidth>
					<Grid item sm={12} xs={12} >
						<InputLabel id='cat-select'>
							Categoría
						</InputLabel>
						<Select
							labelId='cat-select'
							label='Categoría'
							fullWidth
							value={ values.categoria }
							onChange={ (e) => handleInputChange(e.target.value, 'categoria') }
						>
							<MenuItem value={'Estudiante'}>Estudiante</MenuItem>
							<MenuItem value={'Profesionista'}>Profesionista</MenuItem>
							<MenuItem value={'Trabajador CAE'}>Trabajador CAE</MenuItem>
							<MenuItem value={'Médico Residente'}>Médico Residente</MenuItem>

						</Select>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Matricula ( Solo personal CAE )'
							fullWidth
							autoComplete='off'
							value={values.matricula}
							onChange={(e) => handleInputChange(e.target.value, 'matricula')}
							error={errors.matricula?.error}
							helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Acrónimo (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc)'
							fullWidth
							autoComplete='off'
							value={values.acronimo}
							onChange={(e) => handleInputChange(e.target.value, 'acronimo')}
							error={errors.acronimo?.error}
							helperText={errors.acronimo?.error ? errors.acronimo?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Nombre (s)'
							fullWidth
							autoComplete='off'
							value={values.nombre}
							onChange={(e) => handleInputChange(e.target.value, 'nombre')}
							error={errors.nombre?.error}
							helperText={errors.nombre?.error ? errors.nombre?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Apellidos'
							fullWidth
							autoComplete='off'
							value={values.apellido}
							onChange={(e) => handleInputChange(e.target.value, 'apellido')}
							error={errors.apellido?.error}
							helperText={errors.apellido?.error ? errors.apellido?.msg : ''}
						/>
					</Grid>

					

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='No. de Teléfono'
							fullWidth
							autoComplete='off'
							value={values.tel}
							onChange={(e) => handleInputChange(e.target.value, 'tel')}
							error={errors.tel?.error}
							helperText={errors.tel?.error ? errors.tel?.msg : ''}
						/>
					</Grid>

					<Grid item sm={ 12 } xs={ 12 } sx={{ mt: 2 }}>
						<Autocomplete
							id='select-grupo'
							options={ modulos }
							getOptionLabel={ option => option }
							value={ values.modulo }
							onChange={ handleInputChangeGrupo }
							renderOption={ ( props, options ) => (
								<MenuItem key={ props.id } { ...props }>
									<ListItemText primary={ options }/>
								</MenuItem>
							) }
							renderInput={ params => (
								<TextField
									{ ...params }
									label='Grupo'
									inputProps={{
										...params.inputProps,
										autoComplete: 'off'
									}}
									error={ errors.modulo?.error }
									helperText={ errors.modulo?.error ? errors.modulo?.msg : '' }
								/>
							) }
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Ciudad de Procedencia'
							fullWidth
							autoComplete='off'
							value={values.ciudad}
							onChange={(e) => handleInputChange(e.target.value, 'ciudad')}
							error={errors.ciudad?.error}
							helperText={errors.ciudad?.error ? errors.ciudad?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Escuela, Institución o Dependencia'
							fullWidth
							autoComplete='off'
							value={values.escuela}
							onChange={(e) => handleInputChange(e.target.value, 'escuela')}
							error={errors.escuela?.error}
							helperText={errors.escuela?.error ? errors.escuela?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<Button variant='contained' onClick={ handleSubmit }>
							Enviar
						</Button>
					</Grid>

				</FormControl>
			</Box>
		</>
	)
}
