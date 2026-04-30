import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { VueloService } from '../../services/vuelo.service';
import { PasajeroService } from '../../services/pasajero.service';
import { PrecioService } from '../../services/precio.service';
import { ReservaService } from '../../services/reserva.service';
import { Vuelo, OpcionesReserva } from '../../models/vuelo.model';
import { Pasajero } from '../../models/pasajero.model';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatCheckboxModule,
    MatSelectModule, MatStepperModule, MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  vuelo: Vuelo | undefined;
  pasajerosDisponibles: Pasajero[] = [];
  pasajerosSeleccionados: number[] = [];
  opciones: OpcionesReserva = {
    equipajeExtra: false,
    seleccionAsiento: false,
    seguroViaje: false,
    comidaEspecial: null,
    prioridadAbordaje: false
  };
  precioEstimado: any = null;
  resultadoReserva: any = null;

  comidasEspeciales = [
    { value: null, label: 'Ninguna' },
    { value: 'vegetariana', label: 'Vegetariana (+$15)' },
    { value: 'vegana', label: 'Vegana (+$15)' },
    { value: 'sin gluten', label: 'Sin Gluten (+$15)' },
    { value: 'kosher', label: 'Kosher (+$15)' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vueloService: VueloService,
    private pasajeroService: PasajeroService,
    private precioService: PrecioService,
    private reservaService: ReservaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vuelo = this.vueloService.buscarPorId(id);
    this.pasajerosDisponibles = this.pasajeroService.obtenerTodos();
  }

  togglePasajero(id: number): void {
    const idx = this.pasajerosSeleccionados.indexOf(id);
    if (idx > -1) {
      this.pasajerosSeleccionados.splice(idx, 1);
    } else {
      this.pasajerosSeleccionados.push(id);
    }
    this.actualizarPrecio();
  }

  isPasajeroSeleccionado(id: number): boolean {
    return this.pasajerosSeleccionados.includes(id);
  }

  actualizarPrecio(): void {
    if (!this.vuelo || this.pasajerosSeleccionados.length === 0) {
      this.precioEstimado = null;
      return;
    }
    const pasajeros = this.pasajerosSeleccionados
      .map(id => this.pasajeroService.obtenerPorId(id))
      .filter(p => p !== undefined) as Pasajero[];

    this.precioEstimado = this.precioService.calcularPrecioGrupal(this.vuelo, pasajeros, this.opciones);
  }

  realizarReserva(): void {
    if (!this.vuelo) return;

    const pasajeros = this.pasajerosSeleccionados
      .map(id => this.pasajeroService.obtenerPorId(id))
      .filter(p => p !== undefined) as Pasajero[];

    this.resultadoReserva = this.reservaService.crearReserva(this.vuelo.id, pasajeros, this.opciones);

    if (this.resultadoReserva.exito) {
      this.snackBar.open('Reserva creada exitosamente!', 'Cerrar', { duration: 5000 });
    } else {
      this.snackBar.open(`Error: ${this.resultadoReserva.error}`, 'Cerrar', { duration: 5000 });
    }
  }

  formatearDuracion(minutos: number): string {
    return this.vueloService.formatearDuracion(minutos);
  }

  getCategoria(pasajero: Pasajero): string {
    return this.pasajeroService.calcularCategoria(pasajero.fechaNacimiento);
  }

  getNombreCompleto(pasajero: Pasajero): string {
    return this.pasajeroService.formatearNombreCompleto(pasajero);
  }
}
