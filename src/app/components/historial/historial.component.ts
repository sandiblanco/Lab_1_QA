import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatExpansionModule, MatSnackBarModule
  ],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  reservas: Reserva[] = [];
  resumen: any = {};

  constructor(
    private reservaService: ReservaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.reservas = this.reservaService.obtenerTodas();
    this.resumen = this.reservaService.generarResumen();
  }

  confirmar(id: number): void {
    const resultado = this.reservaService.confirmarReserva(id);
    if (resultado) {
      this.snackBar.open('Reserva confirmada', 'Cerrar', { duration: 3000 });
    } else {
      this.snackBar.open('No se pudo confirmar la reserva', 'Cerrar', { duration: 3000 });
    }
    this.cargarDatos();
  }

  cancelar(id: number): void {
    const resultado = this.reservaService.cancelarReserva(id);
    if (resultado.cancelada) {
      this.snackBar.open(`Reserva cancelada. Reembolso: $${resultado.montoReembolso}`, 'Cerrar', { duration: 5000 });
    } else {
      this.snackBar.open('No se pudo cancelar la reserva', 'Cerrar', { duration: 3000 });
    }
    this.cargarDatos();
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'schedule';
      case 'confirmada': return 'check_circle';
      case 'cancelada': return 'cancel';
      case 'completada': return 'done_all';
      case 'expirada': return 'timer_off';
      default: return 'help';
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'pendiente': return '#ff9800';
      case 'confirmada': return '#4caf50';
      case 'cancelada': return '#f44336';
      case 'completada': return '#2196f3';
      case 'expirada': return '#9e9e9e';
      default: return '#666';
    }
  }
}
