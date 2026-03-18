import { describe, it, expect } from "vitest";

import { useEmail } from '../../../composables/useEmail';

describe('useEmail', () => {

    const { validateEmail } = useEmail(); 

    it('Email válido', () => {
        expect(validateEmail('test@test.com')).toBe(true);
    })

    it('Email inválido', () => {
        expect(validateEmail('test.com')).toBe(false);
    })
})