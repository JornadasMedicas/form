import { db, db2, dbc } from '../firebase/firebase-config';
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
        const arr = [];
        if (userInfo.size == 1) {
            console.log("actualizar estado");

            userInfo.forEach(doc => {

                db.collection(`${values}/registroJornada/info`).doc(doc.id).update({ isAssistDay1: true });

                /* arr.push({
                    id: doc.id,
                    day: day,
                    ...doc.data()
                }); */
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

export const updateCounter = async (values) => {
    try {
        if (values) {
            let workshops = await db2.collection('/counters').get();
            workshops.forEach(doc => {
    
                db2.collection('/counters').doc(doc.id).update({ medworkshop: values.medworkshop });
                db2.collection('/counters').doc(doc.id).update({ stomaworkshop1: values.stomaworkshop1 });
                db2.collection('/counters').doc(doc.id).update({ stomaworkshop2: values.stomaworkshop2 });
                db2.collection('/counters').doc(doc.id).update({ stomaworkshop3: values.stomaworkshop3 });

            });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar los espacios en los talleres disponibles',
        });
        return false;
    }
}

export const getCounter = async () => {
    try {
        let workshops = await db2.collection('/counters').get();
        let arr = [];
        
        workshops.forEach(doc => {
    
            arr.push({
                id: doc.id,
                ...doc.data()
            });

        });

        return arr[0];
    } catch (err) {
        console.log(err);
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la obtención de cupos',
        });
    }
}