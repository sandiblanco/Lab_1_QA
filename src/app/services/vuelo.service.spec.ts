import { TestBed } from '@angular/core/testing';
import { VueloService } from './vuelo.service';
import { Vuelo } from '../models/vuelo.model';

describe('VueloService', () => {
    let service: VueloService;
    let vuelos: any[] = [];
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VueloService);
        vuelos = service.obtenerTodos();
    });

    describe('clasificarDuracion', () => {
        it('Duración corta', () => {
            // Arrange
            const vuelo = { duracionMinutos: 90 } as Vuelo;
            // Act
            const resultado = service.clasificarDuracion(vuelo);
            // Assert
            expect(resultado).toBe('corto');
        });

        it('Valor frontera de vuelo medio', () => {
            // Arrange
            const vuelo = { duracionMinutos: 180 } as Vuelo;
            // Act
            const resultado = service.clasificarDuracion(vuelo);
            // Assert
            expect(resultado).toBe('medio');
        });

        it('Valor frontera de vuelo largo', () => {
            // Arrange
            const vuelo = { duracionMinutos: 600 } as Vuelo;
            // Act
            const resultado = service.clasificarDuracion(vuelo);
            // Assert
            expect(resultado).toBe('largo');
        });

        it('Duración muy larga', () => {
            // Arrange
            const vuelo = { duracionMinutos: 900 } as Vuelo;
            // Act
            const resultado = service.clasificarDuracion(vuelo);
            // Assert
            expect(resultado).toBe('ultra_largo');
        });
    });
});
