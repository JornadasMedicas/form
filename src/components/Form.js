import { Autocomplete, Box, Button, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useForm2 from '../hooks/useForm2'
import swal from 'sweetalert2';
import { initState, initValuesFormJordana, initValuesFormJordanaErrors } from './initValues/initValuesFormJornada'
import { validarFormatoCrearRegistro } from '../helpers/validarFormatos'
import ReCAPTCHA from "react-google-recaptcha";
import { getCounter, saveRegistro, updateCounter } from '../services/registrosHelpers';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Return } from './Return';
import { modulos, categorias, talleres } from './initValues/catalogs';

export const Form = () => {

	const { values, handleInputChange, reset } = useForm2(initValuesFormJordana);
	const [errors, setErrors] = useState(initValuesFormJordanaErrors);
	const [visible, setVisible] = useState('none');
	const [showCaptcha, setShowCaptcha] = useState('none');
	const [disabled, setDisabled] = useState(false);
	const [sent, setSent] = useState(false)
	const [checkValue, setCheckValue] = useState(initState);
	const [cupos, setCupos] = useState({})
	const captcha = useRef(null);


	const enableButton = () => {
		swal.fire({
			title: 'IMPORTANTE',
			html: '<div style="text-align: left;"><b>Verifique sus datos antes de enviar el formulario. Su constancia de participación será enviada a su correo electrónico con los datos proporcionados al finalizar el evento.</b></div><hr>' +
				'<div style="text-align: left;">' +
				'<b>Categoría:</b> ' + values.categoria + '<br>' +
				'<b>Acrónimo:</b> ' + values.acronimo + '<br>' +
				'<b>Nombre:</b> ' + values.nombre + ' ' + values.apellido + '<br>' +
				'<b>RFC:</b> ' + values.rfc + '<br>' +
				'<b>Correo Electrónico:</b> ' + values.email + '<br>' +
				'<b>Teléfono:</b> ' + values.tel + '<br>' +
				'<b>Ciudad:</b> ' + values.ciudad + '<br>' +
				`<b>Institución:</b> ${values.escuela === '' ? '<b style="color: red;">No aplica</b>' : values.escuela}` + '<br>' +
				`<b>Módulo:</b> ${values.modulo != '' ? `<b style="color: red;">${values.modulo}</b>` : '<b style="color: red;">No aplica</b>'}` + '<br>' +
				`<b>Talleres:</b>
				<br>${values.isMedWorkshop === false && values.isStomaWorkshop1 === false && values.isStomaWorkshop2 === false && values.isStomaWorkshop3 === false ? '<b style="color: red;">No aplica</b>' : ''}
				<br>${values.isMedWorkshop === true ? talleres.isMedWorkshop : ''}
				<br>${values.isStomaWorkshop1 === true ? talleres.isStomaWorkshop1 : ''}
				<br>${values.isStomaWorkshop2 === true ? talleres.isStomaWorkshop2 : ''}
				<br>${values.isStomaWorkshop3 === true ? talleres.isStomaWorkshop3 : ''}` + '<br>' +
				'</div>' +
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

	useEffect(() => {
		const { isOK, errors, display } = validarFormatoCrearRegistro(values);
		if (display) {
			setShowCaptcha('visible');
			setVisible('none')
			captcha.current.reset();
		} else {
			setShowCaptcha('none');
		}
	  
	}, [values.modulo, values.isMedWorkshop, values.isStomaWorkshop1, values.isStomaWorkshop2, values.isStomaWorkshop3])
	

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
		switch (taller) {
			case 1:
				values.isMedWorkshop === false ? handleInputChange(true, 'isMedWorkshop') : handleInputChange(false, 'isMedWorkshop');
				checkValue.t1 === false ? setCheckValue(checkValue => ({ ...checkValue, t1: true })) : setCheckValue(checkValue => ({ ...checkValue, t1: false }))
				break;

			case 2:
				values.isStomaWorkshop1 === false ? handleInputChange(true, 'isStomaWorkshop1') : handleInputChange(false, 'isStomaWorkshop1');
				checkValue.t2 === false ? setCheckValue(checkValue => ({ ...checkValue, t2: true })) : setCheckValue(checkValue => ({ ...checkValue, t2: false }))
				break;

			case 3:
				values.isStomaWorkshop2 === false ? handleInputChange(true, 'isStomaWorkshop2') : handleInputChange(false, 'isStomaWorkshop2');
				checkValue.t3 === false ? setCheckValue(checkValue => ({ ...checkValue, t3: true })) : setCheckValue(checkValue => ({ ...checkValue, t3: false }))
				break;

			case 4:
				values.isStomaWorkshop3 === false ? handleInputChange(true, 'isStomaWorkshop3') : handleInputChange(false, 'isStomaWorkshop3');
				checkValue.t4 === false ? setCheckValue(checkValue => ({ ...checkValue, t4: true })) : setCheckValue(checkValue => ({ ...checkValue, t4: false }))
				break;
		}
	}

	const handleSubmit = async () => {
		setDisabled(true); //prevent multiple request after pushing button once
		setTimeout(() => {
			setDisabled(false);
		}, 1500);

		setErrors(initValuesFormJordanaErrors);
		const { isOK, errors } = validarFormatoCrearRegistro(values);
		if (isOK) {
			let response = await saveRegistro(values);
			if (response) {
				swal.fire({
					icon: 'success',
					title: 'Su registro se ha realizado correctamente',
					html: 'Su pase de entrada (código QR) se enviará a su correo electrónico antes del evento. <hr><b>No olvide llevarlo consigo pues será su registro de asistencia.<b>',
					showConfirmButton: true
				})
				reset();
				setCheckValue(initState);
				setVisible('none')
				setSent(true);
				setTimeout(() => {
					setSent(false);
				}, 1000);
				updateCounters();
			}
		} else {
			setErrors(errors);
			swal.fire({
				icon: 'error',
				title: 'Error al guardar formulario',
				text: 'Verifica los campos e intenta de nuevo',
			});
		}
	}

	useEffect(() => { //every time page is reload shows workshops availability
		const getCounters = async () => {
			let cupos = await getCounter()
			setCupos(cupos);
		}

		getCounters();
	}, [])

	useEffect(() => { //every time form is sent shows workshops availability
		const getCounters = async () => {
			let cupos = await getCounter()
			setCupos(cupos);
		}

		getCounters();
	}, [sent])

	const updateCounters = async () => {

		let newCounters = cupos;

		if (values.isMedWorkshop === true) {
			newCounters = {
				...newCounters,
				medworkshop: newCounters.medworkshop - 1
			}
		}

		if (values.isStomaWorkshop1 === true) {
			newCounters = {
				...newCounters,
				stomaworkshop1: newCounters.stomaworkshop1 - 1
			}
		}

		if (values.isStomaWorkshop2 === true) {
			newCounters = {
				...newCounters,
				stomaworkshop2: newCounters.stomaworkshop2 - 1
			}
		}

		if (values.isStomaWorkshop3 === true) {
			newCounters = {
				...newCounters,
				stomaworkshop3: newCounters.stomaworkshop3 - 1
			}
		}

		await updateCounter(newCounters);
	}

	return (
		<>
			<Box className='animate__animated animate__fadeIn' sx={{ p: 2, marginBottom: '80px' }}>
				<Typography sx={{ textAlign: 'left', mb: 2, fontWeight: 'bold' }}> Sede del evento:
				</Typography>
				<Typography sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
					<Link href='https://www.gammahoteles.com/hoteles/gamma-xalapa-nubara/eventos' target="_blank">Hotel Gamma Xalapa Nubara</Link>
				</Typography >
				<Grid container sx={{ marginBottom: 1 }}>
					<Grid item xs={12}>
						<img width={'40%'} height={'100%'} src='https://cms.posadas.com/documents/3110971/3153216/gamma-logo-529x159.png' style={{ filter: 'saturate(0)'}}></img>
					</Grid>
				</Grid>
				<Typography sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
					Av. Ruiz Cortines núm. 912, Unidad del Bosque, 91010 Xalapa, Ver. México
				</Typography>
				{/* <Divider sx={{}}/> */}
				<Typography sx={{ textAlign: 'left !important', mb: 3, fontSize: 15 }}>
					<b>Los datos registrados se usarán para la realización y envío de su constancia digital.</b> {' '}
					Su constancia será enviada al finalizar el evento al correo electrónico proporcionado, favor de revisar la bandeja de spam, si presenta alguna inconsistencia reportarlo al Centro de Alta Especialidad Dr. Rafael Lucio 228 - 8144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
				</Typography>
				<hr />
				<FormControl fullWidth sx={{ mt: 2 }}>
					<Grid item sm={12} xs={12} >
						<InputLabel id='cat-select'>
							Categoría *
						</InputLabel>
						<Select
							labelId='cat-select'
							label='Categoría --'
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
							label='Acrónimo * (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc - será utilizado para su constancia)'
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
							label='Nombre (s) *'
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
							label='Apellidos *'
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
							label='RFC *'
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
							label='Correo Electrónico *'
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
							label='No. de Teléfono *'
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
							label='Ciudad de Procedencia *'
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
							label='Escuela, Institución o Dependencia (opcional)'
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
									label='Módulo al que asiste (opcional)'
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
						<fieldset className='rounded-3' style={{ border: '2px inset #5dadb6', borderRadius: '20px' }}>
							<legend className='float-none w-auto px-3'>Talleres Medicina</legend>
							<Grid item xs={2} sx={{ textAlign: 'left', paddingLeft: 5, paddingBottom: 2 }}>
								<Checkbox disabled={cupos.medworkshop > 0 ? false : true} checked={checkValue.t1} onChange={(e) => assistWorkshop(1, e)} /> <b>23 de Noviembre</b> - Estructura de Intervención en los Cuidados Paliativos, un Enfoque Multidisciplinario e Intersectorial - {cupos.medworkshop > 0 ? <b style={{color: 'green'}}>{cupos.medworkshop} cupos disponibles</b> : <b style={{color: 'red'}}>cupos agotados</b>} 
							</Grid>
						</fieldset>
						<fieldset className='rounded-3' style={{ border: '2px inset #d25b67', borderRadius: '20px', marginTop: '15px', width: '100%' }}>
							<legend className='float-none w-auto px-3'>Talleres Estomatología</legend>
							<Grid item xs={2} sx={{ textAlign: 'left', paddingLeft: 5, paddingBottom: 2 }}>
								<Checkbox disabled={cupos.stomaworkshop1 > 0 ? false : true} checked={checkValue.t2} onChange={(e) => assistWorkshop(2, e)} /><b>23 de Noviembre</b> - Complicaciones y Errores en el Tratamiento de Restauración Interproximales - {cupos.stomaworkshop1 > 0 ? <b style={{color: 'green'}}>{cupos.stomaworkshop1} cupos disponibles</b> : <b style={{color: 'red'}}>cupos agotados</b>} <br />
								<Checkbox disabled={cupos.stomaworkshop2 > 0 ? false : true} checked={checkValue.t3} onChange={(e) => assistWorkshop(3, e)} /><b>24 de Noviembre</b> - Utilización de Distintas Técnicas Quirúrgicas en Pacientes de Labio y Paladar Hendido - {cupos.stomaworkshop2 > 0 ? <b style={{color: 'green'}}>{cupos.stomaworkshop2} cupos disponibles</b> : <b style={{color: 'red'}}>cupos agotados</b>} <br />
								<Checkbox disabled={cupos.stomaworkshop3 > 0 ? false : true} checked={checkValue.t4} onChange={(e) => assistWorkshop(4, e)} /><b>24 de Noviembre</b> - Cirugía Maxilofacial en Cuba - {cupos.stomaworkshop3 > 0 ? <b style={{color: 'green'}}>{cupos.stomaworkshop3} cupos disponibles</b> : <b style={{color: 'red'}}>cupos agotados</b>}
							</Grid>
						</fieldset>
					</Grid>

					<hr />

					<Grid className='animate__animated animate__fadeInUp' item sm={12} xs={12} sx={{ mt: 2, display: showCaptcha }}>
						<ReCAPTCHA
							ref={captcha}
							sitekey={process.env.REACT_APP_SITE_KEY}
							size='normal'
							theme='light'
							style={{ width: '305px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }}
							onChange={enableButton}
							onExpired={disableButton}
							onClick={(e) => handleSubmit}
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

				<Typography sx={{ mt: 3, mb: 3, textAlign: 'left', textDecoration: 'underline' }}>
					¿Desea más Información?
					Ponerse en contacto con la Subdirección de Enseñanza, Centro de Alta Especialidad Dr. Rafael Lucio al 2288144500 Ext 1106 lun - vier 07:00 a 15:00 hrs
				</Typography>
				<Return />
			</Box>
		</>
	)
}