import { describe, it, expect } from "vitest";

import { useRut } from '../../../composables/useRut';

describe("useRut", () => {

    const { validateRut, formatRut } = useRut();

    it("validar rut correcto", () => {
        expect(validateRut("23918622-k")).toBe(true);
    })

    it("validar rut correcto sin formato", () => {
        expect(validateRut("261001160")).toBe(true);
    })

    it("determinar rut incorrecto", () => {
        expect(validateRut("15.338.242-4")).toBe(false);
    })

    it("formato rut", () => {
        expect(formatRut("153382425")).toBe("15.338.242-5");
    })


})