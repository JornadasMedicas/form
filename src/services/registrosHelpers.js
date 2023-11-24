import { db, db2 } from '../firebase/firebase-config';
import swal from 'sweetalert2';

const registerDay1 = new Date("November 22, 2023");
const registerDay2 = new Date("November 24, 2023");
const registerDay3 = new Date("November 25, 2023");
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

export const fetchAssistant = async (email) => {
    try {
        const regs = await db.collection(`jornadas`).where('email', '==', email).get();
        const arr = [];

        if (!regs.empty) {
            regs.forEach((assist) => {
                arr.push(assist.data());
            })
            return arr[0];
        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no fue encontrado',
            });
            return false;
        }
    } catch (error) {
        console.log(error);
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la obtención del asistente',
        });
    }
}

export const fetchWorkshopRegistro = async (email, subtab) => {
    try {
        const regs = await db.collection(`jornadas`).where('email', '==', email).get();

        if (!regs.empty) {
            switch (subtab) {
                case '1':
                    regs.forEach(assist => {
                        if (assist.data().isMedWorkshop === true) {
                            db.collection(`jornadas`).doc(email).update({ isMedAssistDay1: true });
                            swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Asistencia confirmada',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        } else {
                            swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'El usuario no se encuentra inscrito en este taller',
                            });
                        }
                    })
                    break;

                case '2':
                    regs.forEach(assist => {
                        if (assist.data().isStomaWorkshop1 === true) {
                            db.collection(`jornadas`).doc(email).update({ isStoma1AssistDay1: true });
                            swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Asistencia confirmada',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        } else {
                            swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'El usuario no se encuentra inscrito en este taller',
                            });
                        }
                    })
                    break;

                case '3':
                    regs.forEach(assist => {
                        if (assist.data().isStomaWorkshop2 === true) {
                            db.collection(`jornadas`).doc(email).update({ isStoma2AssistDay2: true });
                            swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Asistencia confirmada',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        } else {
                            swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'El usuario no se encuentra inscrito en este taller',
                            });
                        }
                    })
                    break;

                case '4':
                    regs.forEach(assist => {
                        if (assist.data().isStomaWorkshop3 === true) {
                            db.collection(`jornadas`).doc(email).update({ isStoma3AssistDay2: true });
                            swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Asistencia confirmada',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        } else {
                            swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'El usuario no se encuentra inscrito en este taller',
                            });
                        }
                    })
                    break;
            }

            return true;

        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no fue encontrado',
            });
            return false;
        }
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
        const regs = await db.collection(`jornadas`).where('email', '==', email).get();

        if (!regs.empty) {
            if (dnow > registerDay1 && dnow < registerDay2) {

                db.collection(`jornadas`).doc(email).update({ isAssistDay1: true });

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

                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Asistencia confirmada',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

            return true;

        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario no fue encontrado',
            });
            return false;
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