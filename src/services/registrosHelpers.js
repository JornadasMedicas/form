import { db, db2 } from '../firebase/firebase-config';
import swal from 'sweetalert2';

const registerDay1 = new Date("November 04, 2023");
const registerDay2 = new Date("November 05, 2023");
const registerDay3 = new Date("November 06, 2023");
const dnow = Date.now();

export const saveRegistro = async (values) => {
    try {
        const userInfo = await db.collection(`jornadas`).doc(values.email).get();
        if (!userInfo.exists) {
            //* NO SE HA REGISTRADO
            const doc = await db.collection('/jornadas').doc(values.email).set(values);
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
        console.log(err);
        swal.fire({
            icon: 'error',
            title: 'Error desconocido',
            text: 'Error desconocido',
        });
        return false;
    }
}

export const fetchAssists = async () => {
    try {
        const arr = [];
        const regs = await db.collection(`jornadas`).get();

        if (!regs.empty) {
            regs.forEach((assist) => {
                arr.push(assist.data());
            })
        }

        let filtered = arr.filter(assist => assist.isAssistDay1 || assist.isAssistDay2 || assist.isAssistDay3)
        
        return filtered;
    } catch (error) {
        console.log(error);
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la obtención de asistentes',
        });
    }
}

export const fetchRegistro = async (email) => {
    try {
        let regs = await db.collection(`jornadas`).get();
        let exists = false
        let arr = [];

        regs.forEach(assist => { //verify email in DB
            if ( assist.id == email) {
                exists = true
            }
        })

        if (exists) {
            if (dnow > registerDay1 && dnow < registerDay2) {

                db.collection(`jornadas`).doc(email).update({ isAssistDay1: true });

                regs.forEach(assist => {
                    arr.push(assist.data());
                });

                arr.forEach(partner => {
                    if ( partner.email == email ) {
                        partner.isAssistDay1 = true;
                    }
                });

                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Asistencia confirmada',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

            if (dnow > registerDay2 && dnow < registerDay3) {

                db.collection(`jornadas`).doc(email).update({ isAssistDay2: true });

                regs.forEach(assist => {
                    arr.push(assist.data());
                });

                arr.forEach(partner => {
                    if ( partner.email == email ) {
                        partner.isAssistDay2 = true;
                    }
                });

                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Asistencia confirmada',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

            if (dnow > registerDay3) {

                db.collection(`jornadas`).doc(email).update({ isAssistDay3: true });

                regs.forEach(assist => {
                    arr.push(assist.data());
                });

                arr.forEach(partner => {
                    if ( partner.email == email ) {
                        partner.isAssistDay3 = true;
                    }
                });

                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Asistencia confirmada',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

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