import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { VueloService } from '../../services/vuelo.service';
import { PrecioService } from '../../services/precio.service';
import { Vuelo } from '../../models/vuelo.model';

@Component({
  selector: 'app-busqueda-vuelos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatChipsModule,
    MatTableModule, MatBadgeModule
  ],
  templateUrl: './busqueda-vuelos.component.html',
  styleUrls: ['./busqueda-vuelos.component.scss']
})
export class BusquedaVuelosComponent {
  origen: string = '';
  destino: string = '';
  fecha: string = '';
  resultados: Vuelo[] = [];
  todosLosVuelos: Vuelo[] = [];
  buscado: boolean = false;
  columnas: string[] = ['codigo', 'ruta', 'fecha', 'duracion', 'clase', 'precio', 'disponibilidad', 'estado', 'acciones'];

  constructor(
    private vueloService: VueloService,
    private precioService: PrecioService
  ) {
    this.todosLosVuelos = this.vueloService.obtenerTodos();
  }

  buscar(): void {
    this.buscado = true;
    if (!this.origen || !this.destino || !this.fecha) {
      this.resultados = [];
      return;
    }
    this.resultados = this.vueloService.buscarVuelos(this.origen, this.destino, new Date(this.fecha));
  }

  mostrarTodos(): void {
    this.buscado = true;
    this.resultados = this.vueloService.obtenerVuelosDisponibles();
  }

  formatearDuracion(minutos: number): string {
    return this.vueloService.formatearDuracion(minutos);
  }

  calcularOcupacion(vuelo: Vuelo): number {
    return this.vueloService.calcularOcupacion(vuelo);
  }

  obtenerAsientosDisponibles(vuelo: Vuelo): number {
    return vuelo.asientosTotales - vuelo.asientosOcupados;
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'programado': return 'primary';
      case 'retrasado': return 'warn';
      case 'cancelado': return 'accent';
      default: return '';
    }
  }

  getClaseLabel(clase: string): string {
    switch (clase) {
      case 'economica': return 'Económica';
      case 'ejecutiva': return 'Ejecutiva';
      case 'primera': return 'Primera';
      default: return clase;
    }
  }
}
