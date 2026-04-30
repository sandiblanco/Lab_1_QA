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

    
    // Pruebas para la función clasificarDuracion
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


    // Pruebas para la función formatearDuracion
    describe('formatearDuracion', () => {
        it('Cuando hay horas y minutos', () => {
            // Arrange
            const minutos = 330; // 5 horas y 30 minutos
            // Act
            const resultado = service.formatearDuracion(minutos);
            // Assert
            expect(resultado).toBe('5h 30m');
        });

        it('Cuando solo hay minutos', () => {
            // Arrange
            const minutos = 45;
            // Act
            const resultado = service.formatearDuracion(minutos);
            // Assert
            expect(resultado).toBe('45m');
        });

        it('Cuando solo hay horas', () => {
            // Arrange
            const minutos = 120; // 2 horas
            // Act
            const resultado = service.formatearDuracion(minutos);
            // Assert
            expect(resultado).toBe('2h');
        });

        it('Valor negativo', () => {
            // Arrange
            const minutos = -30;
            // Act
            const resultado = service.formatearDuracion(minutos);
            // Assert
            expect(resultado).toBe('0m');
        });
    });


    // Pruebas para la función calcularOcupacion
    describe('calcularOcupacion', () => {
        it('Vuelo con ocupación del 50%', () => {
            // Arrange
            const vuelo = { asientosTotales: 200, asientosOcupados: 100 } as Vuelo;
            // Act
            const resultado = service.calcularOcupacion(vuelo);
            // Assert
            expect(resultado).toBe(50);
        });

        it('Vuelo con ocupación del 30%', () => {
            // Arrange
            const vuelo = { asientosTotales: 150, asientosOcupados: 45 } as Vuelo;
            // Act
            const resultado = service.calcularOcupacion(vuelo);
            // Assert
            expect(resultado).toBe(30);
        });

        it('Vuelo completamente lleno', () => {
            // Arrange
            const vuelo = { asientosTotales: 150, asientosOcupados: 150 } as Vuelo;
            // Act
            const resultado = service.calcularOcupacion(vuelo);
            // Assert
            expect(resultado).toBe(100);
        });

        it('Vuelo sin asientos', () => {
            // Arrange
            const vuelo = { asientosTotales: 0, asientosOcupados: 300 } as Vuelo;
            // Act
            const resultado = service.calcularOcupacion(vuelo);
            // Assert
            expect(resultado).toBe(0);
        });
    });
});
