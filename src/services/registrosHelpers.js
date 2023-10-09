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
    } catch( err ) {
        swal.fire({
            icon: 'error',
            title: 'Error desconocido',
            text: 'Error desconocido',
        });
        return false;
    }
}

export const fetchRegistro = async(values) => {
    try {
        const userInfo = await db.collection(`${values}/registroJornada/info`).get();
        const arr = [];
        
        userInfo.forEach(doc => {
            arr.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return arr;

    } catch (error) {
        console.log(error);
    }
}