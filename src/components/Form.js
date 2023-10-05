import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useForm2 from '../hooks/useForm2'
import swal from 'sweetalert2';
import { initValuesFormJordana, initValuesFormJordanaErrors } from './initValues/initValuesFormJornada'
import { validarFormatoCrearRegistro } from '../helpers/validarFormatos'
import ReCAPTCHA from "react-google-recaptcha";
import { saveRegistro } from '../services/registrosHelpers';


const modulos = [
	'Medicina',
	'Enfermería',
	'Químicos',
	'Estomatología'
]

export const Form = () => {
	const { values, handleInputChange, reset } = useForm2(initValuesFormJordana);
	const [errors, setErrors] = useState(initValuesFormJordanaErrors);
	const [visible, setVisible] = useState('none');

	const enableButton = () => {
		swal.fire({
			title: 'IMPORTANTE',
			html: 'Verifique muy bien sus datos antes de enviar el formulario. Su constancia de participación será enviada a su correo electrónico con los datos proporcionados al finalizar el evento. <hr><b>¡El Centro de Alta Especialidad Dr. Rafael Lucio no se hace responsable por datos mal proporcionados!<b>',
			icon: 'warning',
			confirmButtonColor: '#fbb373',
			confirmButtonText: 'Entendido'
		})
		setVisible('inline-block');
	}

	const disableButton = () => {
		setVisible('none');
	}

	const handleSubmit = async () => {
		setErrors(initValuesFormJordanaErrors);
		const { isOK, errors } = validarFormatoCrearRegistro(values);
		if (isOK) {
			let response = await saveRegistro( values );
			if( response ) {
				swal.fire({
					icon: 'success',
					title: 'Su registro se ha realizado correctamente',
					html: 'Su pase de entrada (código QR) se enviará a su correo electrónico antes del evento. <hr><b>No olvide llevarlo consigo pues será su registro de asistencia.<b>',
					showConfirmButton: true
				})
				reset();
			}	
		} else {
			setErrors(errors);
			swal.fire({
				icon: 'error',
				title: 'Error al guardar formulario',
				text: 'Verifica los campos e intenta de nuevo',
				/* footer: '<a href="">Why do I have this issue?</a>' */
			});
		}
	}
	const handleInputChangeGrupo = (e, newValue) => {
		if (newValue) {
			handleInputChange(newValue, 'modulo');
		}
		else {
			handleInputChange('', 'modulo');
		}
	}

	return (
		<>
			<Box sx={{ p: 2, marginBottom: '80px' }}>
				<Typography sx={{ textAlign: 'left', mb: 3, fontWeight: 'bold' }}> Dirección del evento: Hotel Gamma Xalapa Nubara- Av. Ruiz Cortines núm. 912, Unidad del Bosque, 91010 Xalapa, Ver. México</Typography>
				{/* <Divider sx={{}}/> */}
				<Typography sx={{ textAlign: 'left !important', mb: 3, fontSize: 14 }}>
					<b>Los datos registrados se usarán para la realización y envío de su constancia digital.</b> {' '}
					Su constancia será enviada al finalizar el evento al correo electrónico proporcionado, favor de revisar la bandeja de spam, si presenta alguna inconsistencia reportarlo al Centro de Alta Especialidad Dr. Rafael Lucio 228- 8144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
				</Typography>
				<hr />
				<FormControl fullWidth sx={{ mt: 2 }}>
					<Grid item sm={12} xs={12} >
						<InputLabel id='cat-select'>
							Categoría
						</InputLabel>
						<Select
							labelId='cat-select'
							label='Categoría'
							fullWidth
							value={values.categoria}
							onChange={(e) => handleInputChange(e.target.value, 'categoria')}
						>
							<MenuItem value={'Estudiante'}>Estudiante</MenuItem>
							<MenuItem value={'Profesionista'}>Profesionista</MenuItem>
							<MenuItem value={'Trabajador CAE'}>Trabajador CAE</MenuItem>
							<MenuItem value={'Médico Residente'}>Médico Residente</MenuItem>

						</Select>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Matrícula ( Solo para personal CAE )'
							fullWidth
							autoComplete='off'
							value={values.categoria === 'Estudiante' || values.categoria === 'Profesionista' ? values.matricula = '' : values.matricula}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'matricula')}
							error={errors.matricula?.error}
							helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
							inputProps={{ maxLength: 4 }}
							disabled={values.categoria === 'Estudiante' || values.categoria === 'Profesionista' ? true : false}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Acrónimo (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc - será utilizado para su constancia)'
							fullWidth
							autoComplete='off'
							value={values.acronimo}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'acronimo')}
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
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'nombre')}
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
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'apellido')}
							error={errors.apellido?.error}
							helperText={errors.apellido?.error ? errors.apellido?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='RFC'
							fullWidth
							autoComplete='off'
							value={values.rfc}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'rfc')}
							error={errors.rfc?.error}
							helperText={errors.rfc?.error ? errors.rfc?.msg : ''}
							inputProps={{ maxLength: 13 }}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo Electrónico'
							fullWidth
							autoComplete='off'
							value={values.email}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'email')}
							error={errors.email?.error}
							helperText={errors.email?.error ? errors.email?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='No. de Teléfono'
							fullWidth
							autoComplete='off'
							value={values.tel}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'tel')}
							error={errors.tel?.error}
							helperText={errors.tel?.error ? errors.tel?.msg : ''}
							inputProps={{ maxLength: 10 }}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<Autocomplete
							id='select-grupo'
							options={modulos}
							getOptionLabel={option => option}
							value={values.modulo}
							onChange={handleInputChangeGrupo}
							renderOption={(props, options) => (
								<MenuItem key={props.id} {...props}>
									<ListItemText primary={options} />
								</MenuItem>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label='Módulo al que asiste'
									inputProps={{
										...params.inputProps,
										autoComplete: 'off'
									}}
									error={errors.modulo?.error}
									helperText={errors.modulo?.error ? errors.modulo?.msg : ''}
								/>
							)}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Ciudad de Procedencia'
							fullWidth
							autoComplete='off'
							value={values.ciudad}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'ciudad')}
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
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'escuela')}
							error={errors.escuela?.error}
							helperText={errors.escuela?.error ? errors.escuela?.msg : ''}
						/>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 3 }}>
						<ReCAPTCHA
							sitekey={process.env.REACT_APP_SITE_KEY}
							size='normal'
							theme='light'
							style={{ width: '305px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }}
							onChange={enableButton}
							onExpired={disableButton}
						/>
						<Button className='animate__animated animate__fadeInUp' variant='contained' onClick={handleSubmit} sx={{ display: visible, backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' } }}>
							Enviar
						</Button>
					</Grid>

				</FormControl>

				<Typography sx={{ mt: 3, textAlign: 'left', textDecoration: 'underline' }}>
					¿Desea más Información?
					Ponerse en contacto con la Subdirección de Enseñanza, Centro de Alta Especialidad Dr. Rafael Lucio al 2288144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
				</Typography>
			</Box>
		</>
	)
}
