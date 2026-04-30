import { TestBed } from '@angular/core/testing';
import { VueloService } from './vuelo.service';

describe('VueloService', () => {
    let service: VueloService;
    const vuelos: any[] = [];
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VueloService);
        vuelos = service.obtenerTodos();
    });

    describe('clasificarDuracion', () => {
        it('Duración corta', () => {
            // Arrange
            vuelos[0].duracionMinutos = 90;
            // Act
            const resultado = service.clasificarDuracion(vuelos[0]);
            // Assert
            expect(resultado).toBe('corto');
        });

        it('Valor frontera', () => {
            // Act
            const resultado = service.clasificarDuracion(vuelos[3]);
            // Assert
            expect(resultado).toBe('corto');
        });
    });
});
