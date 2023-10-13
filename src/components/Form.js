import { Autocomplete, Box, Button, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import useForm2 from '../hooks/useForm2'
import swal from 'sweetalert2';
import { initValuesFormJordana, initValuesFormJordanaErrors } from './initValues/initValuesFormJornada'
import { validarFormatoCrearRegistro } from '../helpers/validarFormatos'
import ReCAPTCHA from "react-google-recaptcha";
import { saveRegistro } from '../services/registrosHelpers';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Return } from './Return';
import { modulos, categorias, matriculados } from './initValues/catalogs';

export const Form = () => {
	const { values, handleInputChange, reset } = useForm2(initValuesFormJordana);
	const [errors, setErrors] = useState(initValuesFormJordanaErrors);
	const [visible, setVisible] = useState('none');
	const [disabled, setDisabled] = useState(false);
	const captcha = useRef(null);
	const [checkValue, setCheckValue] = useState(false);

	const enableButton = () => {
		swal.fire({
			title: 'IMPORTANTE',
			html: 'Verifique muy bien sus datos antes de enviar el formulario. Su constancia de participación será enviada a su correo electrónico con los datos proporcionados al finalizar el evento.<br><hr>' +
				'<b>Categoría:</b> ' + values.categoria + '<br>' +
				'<b>Matrícula:</b> ' + values.matricula + '<br>' +
				'<b>Acrónimo:</b> ' + values.acronimo + '<br>' +
				'<b>Nombre:</b> ' + values.nombre + ' ' + values.apellido + '<br>' +
				'<b>RFC:</b> ' + values.rfc + '<br>' +
				'<b>Correo Electrónico:</b> ' + values.email + '<br>' +
				'<b>Teléfono:</b> ' + values.tel + '<br>' +
				'<b>Módulo:</b> ' + values.modulo + '<br>' +
				'<b>Ciudad:</b> ' + values.ciudad + '<br>' +
				'<b>Institución:</b> ' + values.escuela + '<br>' +
				'<hr><b>¡El Centro de Alta Especialidad Dr. Rafael Lucio no se hace responsable por datos mal proporcionados!</b>',
			icon: 'warning',
			confirmButtonColor: '#fbb373',
			confirmButtonText: 'Entendido',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				setVisible('inline-block');
			} else {
				captcha.current.reset();
			}
		})
	}

	const disableButton = () => {
		setVisible('none');
	}

	const handleInputChangeGrupo = (e, newValue) => {
		if (newValue) {
			handleInputChange(newValue, 'modulo');
		}
		else {
			handleInputChange('', 'modulo');
		}
	}

	const manageDisabled = () => {
		disabled == false ? setDisabled(true) : setDisabled(false)
	}

	const assistWorkshop = (taller, e) => {
		if (taller == 1) {
			setCheckValue(!checkValue);
		}
		console.log(taller, e.target.value);
		switch (taller) {
			case 1:
				values.isMedWorkshop === false ? values.isMedWorkshop = true : values.isMedWorkshop = false
				break;

			case 2:
				values.isStomaWorkshop1 === false ? values.isStomaWorkshop1 = true : values.isStomaWorkshop1 = false
				break;

			case 3:
				values.isStomaWorkshop2 === false ? values.isStomaWorkshop2 = true : values.isStomaWorkshop2 = false
				break;
		}

		// console.log(values.isMedWorkshop, values.isStomaWorkshop1, values.isStomaWorkshop2);
	}

	console.log(checkValue);

	const handleSubmit = async () => {
		setErrors(initValuesFormJordanaErrors);
		const { isOK, errors } = validarFormatoCrearRegistro(values);
		if (isOK) {
			console.log(values);
			let response = await saveRegistro(values);
			if (response) {
				swal.fire({
					icon: 'success',
					title: 'Su registro se ha realizado correctamente',
					html: 'Su pase de entrada (código QR) se enviará a su correo electrónico antes del evento. <hr><b>No olvide llevarlo consigo pues será su registro de asistencia.<b>',
					showConfirmButton: true
				})
				reset();
				setCheckValue(false);
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

	return (
		<>
			<Box className='animate__animated animate__fadeIn' sx={{ p: 2, marginBottom: '80px' }}>
				<Typography sx={{ textAlign: 'left', mb: 3, fontWeight: 'bold' }}> Dirección del evento: Hotel Gamma Xalapa Nubara - Av. Ruiz Cortines núm. 912, Unidad del Bosque, 91010 Xalapa, Ver. México</Typography>
				{/* <Divider sx={{}}/> */}
				<Typography sx={{ textAlign: 'left !important', mb: 3, fontSize: 15 }}>
					<b>Los datos registrados se usarán para la realización y envío de su constancia digital.</b> {' '}
					Su constancia será enviada al finalizar el evento al correo electrónico proporcionado, favor de revisar la bandeja de spam, si presenta alguna inconsistencia reportarlo al Centro de Alta Especialidad Dr. Rafael Lucio 228 - 8144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
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
							{categorias.map((cat, index) =>
								<MenuItem key={index} value={cat}>{cat}</MenuItem>
							)}

						</Select>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Matrícula ( Solo para personal CAE )'
							fullWidth
							autoComplete='off'
							value={!matriculados.includes(values.categoria) ? values.matricula = '' : values.matricula}
							onChange={(e) => handleInputChange(e.target.value.toUpperCase(), 'matricula')}
							error={errors.matricula?.error}
							helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
							inputProps={{ maxLength: 4 }}
							disabled={!matriculados.includes(values.categoria) ? true : false}
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
							value={values.nombre} condition
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
						<TextField
							label='Ciudad de Procedencia'
							fullWidth
							autoComplete='off' condition
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

					<Grid container rowSpacing={0} columns={2} item sx={{ mt: 2 }}>
						<Grid item xs={2} sx={{ textAlign: 'left', paddingLeft: 5 }}>
							<Typography>Talleres Medicina</Typography>
							<Checkbox checked={checkValue} onChange={(e) => assistWorkshop(1, e)} /> 23 de Noviembre - Estructura de intervención en los cuidados paliativos, un enfoque multidisciplinario e intersectorial
						</Grid>
						<Grid item className='animate__animated animate__fadeInUp' xs={2} sx={{ display: values.modulo === 'Estomatología' ? 'visible' : 'none', textAlign: 'left', paddingLeft: 5, mt: 3 }}>
							{values.modulo === 'Estomatología'
								&&
								<>
									<Typography>Talleres Estomatología</Typography>
									<Checkbox onChange={(e) => assistWorkshop(2, e)} />23 de Noviembre - Complicaciones y errores en el tratamiento de restauración interproximales <br />
									<Checkbox onChange={(e) => assistWorkshop(3, e)} />24 de Noviembre - Utilización de distintas técnicas quirúrgicas en pacientes de labio y paladar hendido
								</>}
						</Grid>
					</Grid>

					<hr />

					<Grid item sm={12} xs={12} sx={{ mt: 2 }}>
						<ReCAPTCHA
							ref={captcha}
							sitekey={process.env.REACT_APP_SITE_KEY}
							size='normal'
							theme='light'
							style={{ width: '305px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }}
							onChange={enableButton}
							onExpired={disableButton}
						/>

						<Grid sx={{ display: visible }} className='animate__animated animate__fadeInUp'>
							<Checkbox defaultChecked onChange={manageDisabled} />Acepto que mis datos personales sean tratados de acuerdo con el <Link href="https://www.ssaver.gob.mx/transparencia/wp-content/uploads/sites/7/2022/06/Aviso-de-privacidad-simplificado-e-integral-Capacitacion.pdf" target="_blank">
								<b>aviso de privacidad de capacitación.</b>
							</Link>
						</Grid>
					</Grid>

					<Grid item sm={12} xs={12} sx={{ mt: 1 }}>
						<Button disabled={disabled} className='animate__animated animate__fadeInUp' variant='contained' onClick={handleSubmit} sx={{ display: visible, backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' } }}>
							Enviar
						</Button>
					</Grid>

				</FormControl>

				<Typography sx={{ mt: 3, textAlign: 'left', textDecoration: 'underline' }}>
					¿Desea más Información?
					Ponerse en contacto con la Subdirección de Enseñanza, Centro de Alta Especialidad Dr. Rafael Lucio al 2288144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
				</Typography>
				<Return />
			</Box>
		</>
	)
}