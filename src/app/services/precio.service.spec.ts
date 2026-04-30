/**
 * 3.1 - calcularImpuestos(subtotal, paisOrigen, paisDestino): 3 pruebas
 * 3.2 - convertirMoneda(monto, monedaDestino): 2 pruebas
 * 3.3 - evaluarOferta(precios, precioObjetivo): 2 pruebas
 */

import { TestBed } from '@angular/core/testing';
import { PrecioService } from './precio.service';
import { PasajeroService } from './pasajero.service';

describe("PrecioService", () => {

    let precioService: PrecioService;
    let pasajeroService: PasajeroService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PasajeroService, PrecioService]
        });
        precioService = TestBed.inject(PrecioService);
        pasajeroService = TestBed.inject(PasajeroService);
    });

    describe("calcularImpuestos", () => {
        it("Debería calcular el impuesto doméstico usando la tasa del país (mismo origen y destino)", () => {
            const subtotal = 100;
            const paisOrigen = 'CR';
            const paisDestino = 'CR';

            const impuestos = precioService.calcularImpuestos(subtotal, paisOrigen, paisDestino);

            expect(impuestos).toBe(13);
        });

        it("Debería calcular el impuesto internacional usando el promedio de ambos países", () => {
            const subtotal = 100;
            const paisOrigen = 'CR';
            const paisDestino = 'US';

            const impuestos = precioService.calcularImpuestos(subtotal, paisOrigen, paisDestino);

            expect(impuestos).toBe(10.25);
        });

        it("Debería retornar 0 cuando un país no está registrado", () => {
            const subtotal = 100;
            const paisOrigen = 'CR';
            const paisDestino = 'XX';

            const impuestos = precioService.calcularImpuestos(subtotal, paisOrigen, paisDestino);

            expect(impuestos).toBe(6.5);
        });
    });

    describe("convertirMoneda", () => {
        it("Debería convertir correctamente a una moneda soportada", () => {
            const monto = 100;
            const monedaDestino = 'EUR';

            const resultado = precioService.convertirMoneda(monto, monedaDestino);

            expect(resultado).toBe(92);
        });

        it("Debería retornar el monto original cuando la moneda no está soportada", () => {
            const monto = 100;
            const monedaDestino = 'XYZ';

            const resultado = precioService.convertirMoneda(monto, monedaDestino);

            expect(resultado).toBe(100);
        });
    });

    describe("evaluarOferta", () => {
        it("Debería clasificar como 'excelente' cuando el precio es significativamente menor al promedio", () => {
            const precios = [100, 100, 100, 100];
            const precioObjetivo = 70;

            const evaluacion = precioService.evaluarOferta(precios, precioObjetivo);

            expect(evaluacion).toBe('excelente');
        });

        it("Debería retornar 'sin referencia' cuando el arreglo de precios está vacío", () => {
            const precios: number[] = [];
            const precioObjetivo = 100;

            const evaluacion = precioService.evaluarOferta(precios, precioObjetivo);

            expect(evaluacion).toBe('sin referencia');
        });
    });
});