import { db } from '../firebase/firebase-config';
import swal from 'sweetalert2';

export const saveRegistro = async (values) => {
    try {
        const userInfo = await db.collection(`${values.email}/registroJornada/info`).get();
        if (!userInfo.size == 1) {
            //* NO SE HA REGISTRADO
            const doc = await db.collection(`${values.email}/registroJornada/info`).add(values);
            return true;
        } else {
            //! YA SE REGISTRO
            swal.fire({
                icon: 'error',
                title: 'Error al registrar usuario',
                text: 'El correo ya se encuentra registrado.',
                /* footer: '<a href="">Why do I have this issue?</a>' */
            });
            return false;
        }
    } catch (err) {
        swal.fire({
            icon: 'error',
            title: 'Error desconocido',
            text: 'Error desconocido',
        });
        return false;
    }
}

export const fetchRegistro = async (values) => {
    try {
        const userInfo = await db.collection(`${values}/registroJornada/info`).get();
        const day = 1;
        if (userInfo.size == 1) {
            console.log("actualizar estado");
            const arr = [];

            userInfo.forEach(doc => {

                db.collection(`${values}/registroJornada/info`).doc(doc.id).update({ isAssistDay1: true });

                arr.push({
                    id: doc.id,
                    day: day,
                    ...doc.data()
                });
            });

            swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Asistencia confirmada',
                showConfirmButton: false,
                timer: 1000
            })

            return arr;

        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no fue encontrado',
            });
            return [];
        }

    } catch (error) {
        console.log(error);
    }
}