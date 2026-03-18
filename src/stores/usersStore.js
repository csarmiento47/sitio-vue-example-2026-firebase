import { defineStore } from "pinia";
import { db } from '../services/firebaseService';

import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: []
    }),

    actions: {

        async loadUsers() {
            const snapshot = await getDocs(collection(db, "users"))
            this.users = snapshot.docs.map(d => ({
                id: d.id,
                ...d.data()
            }))
        },

        async addUser(user) {
            const userData = {
                rut: user.rut,
                nombre: user.nombre,
                apellido: user.apellido,
                dob: user.dob,
                genero: user.genero,
                email: user.email,
                password: user.password,
                foto: user.foto,
                pais: user.pais,
                hobbies: user.hobbies || [],
                terminos: user.terminos
            }

            const docRef = await addDoc(collection(db, "users"), userData)
            this.users.push({
                id: docRef.id,
                ...userData
            })
        },

        async deleteUser(id) {
            await deleteDoc(doc(db, "users", id))
            this.users = this.users.filter(u => u.id !== id)
        },

        async updateUser(id, data) {
            try{
                const ref = doc(db, "users",id);
                await updateDoc(ref, data)
                const index = this.users.findIndex(u => u.id === id)
                if (index !== -1){
                    this.users[index] = {
                        id, ...data
                    }
                }
            }
            catch(error) {
                console.error('Error actualizando usuario',error);
                throw error;
            }
            
        },

        userExists(email, rut, currentId = null) {
            const emailExists = this.users.some(u =>
                u.email === email && u.id !== currentId
            )
            const rutExists = this.users.some(u =>
                u.rut === rut && u.id !== currentId
            )
            return { emailExists, rutExists }
        }


    }
})