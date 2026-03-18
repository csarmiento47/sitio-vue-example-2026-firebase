import { describe, it, expect, beforeEach } from "vitest";

import { setActivePinia, createPinia } from "pinia";

import { useUsersStore } from '../../../stores/usersStore';

describe('usersStore', () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    })

    it('Agregar usuario', () => {
        const store = useUsersStore();

        store.users.push({ nombre: "Juanito" });
        expect(store.users.length).toBe(1);
    })

    it('Detecta email duplicado', () => {
        const store = useUsersStore();
        store.users = [{email: "test@test.com", rut:'15.338.242-5', id:1 }]
        const result = store.userExists("test@test.com","1");
        expect(result.emailExists).toBe(true);
    })

})