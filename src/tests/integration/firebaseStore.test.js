import { describe, it, expect } from "vitest";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../setup/firebaseTestSetup";

describe('Firestore integration', () => {

    it('Crear un usuario (registro) en firetore', async () => {

        const userData = {
            rut: '15338242-5',
            nombre: 'Esteban',
            apellido: 'Dido',
            email: 'esteban.dido@gmail.com'
        }
        const docRef = await addDoc(collection(db,'users'),userData)


        expect(docRef.id).toBeDefined();
    })

    it('Leer usuarios registrados desde Firestore', async () => {
        const snapshot = await getDocs(collection(db,'users'))
        console.log(snapshot.docs.map(d => d.data()))
        expect(snapshot.docs.length).toBeGreaterThanOrEqual(1);
    })
})