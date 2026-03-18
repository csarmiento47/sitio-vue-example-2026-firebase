import { describe, it, expect } from "vitest";

import { useEdad } from "../../../composables/useEdad";

describe('useEdad', () => {
    const { calculateEdad, isValidDate } = useEdad();

    it('calcular edad', () => {
        const age = calculateEdad("1990-03-11");
        expect(age).toBeGreaterThanOrEqual(36);
    })

    it('Retorna - si es una fecha no válida', () => {
        expect(calculateEdad(null)).toBe('-');
    })

    it('calcular edad', () => {
        const age = calculateEdad("1990-04-11");
        expect(age).toBeGreaterThanOrEqual(30);
    })

    it('Retorna - si es una fecha no válida (2)', () => {
        expect(calculateEdad("1991-02-29")).toBe('-');
    })

    it('Validar que una fecha que no existe no es válida', () => {
        expect(isValidDate('1991-02-29')).toBe(false)
    })

    it('Validar que una fecha es válida', () => {
        expect(isValidDate('1992-02-29')).toBe(true)
    })
})