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

    
    // Pruebas para el método que clasifica la duración de un vuelo
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


    // Pruebas para el método que formatea la duración de un vuelo en horas y minutos
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


    // Pruebas para el método que calcula la ocupación de un vuelo
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


    // Pruebas para el método de obtener asientos disponibles de un vuelo
    describe('obtenerAsientosDisponibles', () => {
        it('Vuelo con asientos disponibles', () => {
            // Arrange
            const vueloId = 1;
            // Act
            const resultado = service.obtenerAsientosDisponibles(vueloId);
            // Assert
            expect(resultado).toBe(60);
        });

        it('Vuelo que no existe', () => {
            // Arrange
            const vueloId = 20;
            // Act
            const resultado = service.obtenerAsientosDisponibles(vueloId);
            // Assert
            expect(resultado).toBe(-1);
        });

        it('Vuelo cancelado', () => {
            // Arrange
            const vueloId = 5;
            // Act
            const resultado = service.obtenerAsientosDisponibles(vueloId);
            // Assert
            expect(resultado).toBe(0);
        });
    });


    // Pruebas para el método de buscar vuelos filtrando por ciudad origen, destino y fecha.
    describe('buscarVuelos', () => {
        it('Buscar una ruta existente', () => {
            // Arrange
            const origen = 'San José';
            const destino = 'Miami';
            const fecha = new Date('2026-04-15T06:00:00');
            // Act
            const resultado = service.buscarVuelos(origen, destino, fecha);
            // Assert
            expect(resultado.length).toBeGreaterThan(0);
        });

        it('Retorna un arreglo vacío para una ruta inexistente', () => {
            // Arrange
            const origen = 'Panamá';
            const destino = 'Japón';
            const fecha = new Date('2026-04-15T06:00:00');
            // Act
            const resultado = service.buscarVuelos(origen, destino, fecha);
            // Assert
            expect(resultado).toEqual([]);
        });

        it(' Verificar que los resultados vienen ordenados correctamente', () => {
            // Arrange
            const origen = 'San José';
            const destino = 'Miami';
            const fecha = new Date('2026-04-15T06:00:00');
            // Act
            const resultado = service.buscarVuelos(origen, destino, fecha);
            // Assert
            expect(resultado[0].precioBase).toBeLessThan(resultado[1].precioBase);
        });
    });
});
