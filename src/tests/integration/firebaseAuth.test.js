import { describe, it, expect } from "vitest";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../setup/firebaseTestSetup";

describe('Firebase Auth Integration', () => {

    it('Crear un nuevo usuario en el emulador', async () => {
        const resultado = await createUserWithEmailAndPassword(
            auth,
            "administrador@testing.com",
            "123456"
        );
        expect(resultado.user.email).toBe("administrador@testing.com");
    })


})