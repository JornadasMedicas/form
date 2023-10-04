import React from 'react'
import { useForm } from '../hooks/useForm'
import { QRCode } from 'react-qrcode-logo';

export const GenerateQR = () => {

  const [formValue, handleInputChange, reset] = useForm({
    rfc: ''
  })

  const { rfc } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();

    console.log(rfc);
  }

  return (
    <>
      <h2>Prueba Generación QR</h2>
      <form className='mt-2' onSubmit={ handleSubmit }>
        <input 
          type='text'
          placeholder='Escribe tu RFC'
          style={{ width: 'auto', marginTop: '30px'}}
          name='rfc'
          value={ rfc }
          onChange={ handleInputChange }
          autoComplete='off'
          maxLength={ 13 }
        />
      </form>

      <div className='mt-4' style={{overflow: 'hidden'}}>
        <QRCode 
          value={rfc} 
          size={250} 
          ecLevel='H' 
          logoImage='cae-logo.svg'
          logoPaddingStyle='circle'
          qrStyle='dots'
          eyeRadius={10}
          removeQrCodeBehindLogo/>
      </div>

      <button
          className='btn btn-outline-dark mt-4'
          type='submit' 
          style={{ display: 'inline-block', marginBottom: '100px'}}>Generar Pase</button>
    </>
  )
}