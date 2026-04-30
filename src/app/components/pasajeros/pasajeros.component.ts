import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { PasajeroService } from '../../services/pasajero.service';
import { Pasajero } from '../../models/pasajero.model';

@Component({
  selector: 'app-pasajeros',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, MatTableModule],
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.scss']
})
export class PasajerosComponent implements OnInit {
  pasajeros: Pasajero[] = [];
  columnas: string[] = ['nombre', 'pasaporte', 'nacionalidad', 'categoria', 'frecuente', 'millas', 'necesidades'];

  constructor(private pasajeroService: PasajeroService) {}

  ngOnInit(): void {
    this.pasajeros = this.pasajeroService.obtenerTodos();
  }

  getNombreCompleto(p: Pasajero): string {
    return this.pasajeroService.formatearNombreCompleto(p);
  }

  getCategoria(p: Pasajero): string {
    return this.pasajeroService.calcularCategoria(p.fechaNacimiento);
  }

  getEdad(p: Pasajero): number {
    return this.pasajeroService.calcularEdad(p.fechaNacimiento);
  }
}
