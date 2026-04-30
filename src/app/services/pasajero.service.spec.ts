/**
    1. calcularCategoria(fechaNacimiento): 4 pruebas (una por cada rango de edad).
    2. validarPasajero(pasajero): 4 pruebas (datos correctos, nombre vacío, pasaporte e email inválidos).
    3. obtenerBeneficiosFrecuente(pasajero): 2 pruebas (membresía alta vs sin membresía).
    4. calcularMillasGanadas(duracion, clase, nivel): 1 prueba (cálculo básico)
 */

import { Pasajero } from "../models/pasajero.model";
import { IPasajeroService } from "../interfaces/ipasajero.service";
import { PasajeroService } from "./pasajero.service";


function getAgeAsDate(age: number): Date {
    const TODAY = new Date();

    return new Date(
        TODAY.getFullYear() - age,
        TODAY.getMonth(),
        TODAY.getDate()
    )
}

describe("PasajerosService", () => {

    let pasajeroService: IPasajeroService;
    let basePassenger: Pasajero;

    beforeEach(() => {
        pasajeroService = new PasajeroService()

        basePassenger = {
            id: 1,
            nombre: 'Carlos',
            apellido: 'Ramírez',
            pasaporte: 'CR1234567',
            nacionalidad: 'CR',
            fechaNacimiento: new Date('1990-05-15'),
            email: 'carlos@email.com',
            telefono: '+506 88880001',
            genero: 'M',
            miembroFrecuente: false,
            nivelFrecuente: 'ninguno',
            millasAcumuladas: 0,
            necesidadesEspeciales: [],
            visasVigentes: [],
            contactoEmergencia: { nombre: 'Ana Ramírez', telefono: '+506 88880002', relacion: 'esposa' }
        };
    })

    describe("Definir categoria de pasajero según su edad", () => {
        it("Debería categorizar como 'Infante' a un pasajero menor de 2 años", () => {
            const birthDate = getAgeAsDate(1)

            const category = pasajeroService.calcularCategoria(birthDate);

            expect(category).toBe("infante");
        });

        it("Debería categorizar como 'Niño' a un pasajero entre 2 y 11 años", () => {
            const birthDate = getAgeAsDate(11)

            const category = pasajeroService.calcularCategoria(birthDate);
            expect(category).toBe("nino");
        });

        it("Debería categorizar como 'Adulto' a un pasajero entre 12 y 64 años", () => {
            const birthDate = getAgeAsDate(64)

            const category = pasajeroService.calcularCategoria(birthDate);

            expect(category).toBe("adulto");
        });

        it("Debería categorizar como 'Adulto Mayor' a un pasajero de 65 años o más", () => {
            const birthDate = getAgeAsDate(80)

            const category = pasajeroService.calcularCategoria(birthDate);

            expect(category).toBe("adulto_mayor");
        });
    })

    describe("Validar datos de pasajero", () => {
        it("Debería pasar la validación con datos correctos", () => {
            const resultado = pasajeroService.validarPasajero(basePassenger);

            expect(resultado.valido).toBe(true);
            expect(resultado.errores).toEqual([]);
        });

        it("Debería fallar cuando el nombre está vacío", () => {
            const pasajero = { ...basePassenger, nombre: '' };
            const resultado = pasajeroService.validarPasajero(pasajero);

            expect(resultado.valido).toBe(false);
            expect(resultado.errores).toContain('El nombre es obligatorio');
        });

        it("Debería fallar cuando el pasaporte no cumple el formato", () => {
            const pasajero = { ...basePassenger, pasaporte: 'INVALIDO' };
            const resultado = pasajeroService.validarPasajero(pasajero);

            expect(resultado.valido).toBe(false);
            expect(resultado.errores).toContain('El pasaporte debe tener formato válido (2 letras mayúsculas + 7 dígitos)');
        });

        it("Debería fallar cuando el email es inválido", () => {
            let pasajero = { ...basePassenger, email: 'correo-sin-punto' };
            let resultado = pasajeroService.validarPasajero(pasajero);
            expect(resultado.errores).toContain('El email debe contener @');
            expect(resultado.valido).toBe(false);

            pasajero = { ...basePassenger, email: 'correo-sin-punto@domain' };
            resultado = pasajeroService.validarPasajero(pasajero);
            expect(resultado.errores).toContain('El email debe tener un dominio válido');
            expect(resultado.valido).toBe(false);
        });
    })

    describe("Obtener beneficios de viaje frecuente", () => {
        it("Debería retornar beneficios para membresía nivel oro", () => {
            const pasajero: Pasajero = { ...basePassenger, miembroFrecuente: true, nivelFrecuente: 'oro' };
            const beneficios = pasajeroService.obtenerBeneficiosFrecuente(pasajero);

            expect(beneficios.descuento).toBe(15);
            expect(beneficios.equipajeExtra).toBe(15);
            expect(beneficios.salaVip).toBe(true);
            expect(beneficios.prioridadAbordaje).toBe(true);
        });

        it("Debería retornar sin beneficios para pasajero sin membresía", () => {
            const pasajero = { ...basePassenger, miembroFrecuente: false };
            const beneficios = pasajeroService.obtenerBeneficiosFrecuente(pasajero);

            expect(beneficios.descuento).toBe(0);
            expect(beneficios.equipajeExtra).toBe(0);
            expect(beneficios.salaVip).toBe(false);
            expect(beneficios.prioridadAbordaje).toBe(false);
        });
    })

    describe("Calcular millas ganadas", () => {
        it("Debería calcular correctamente para clase económica sin membresía", () => {
            const millas = pasajeroService.calcularMillasGanadas(60, 'economica', 'ninguno');

            expect(millas).toBe(60);
        });
    })
})