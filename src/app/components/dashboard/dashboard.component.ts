import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VueloService } from '../../services/vuelo.service';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  estadisticas: any = {};
  resumenReservas: any = {};
  vuelosDisponibles: number = 0;

  constructor(
    private vueloService: VueloService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.estadisticas = this.vueloService.obtenerEstadisticasOcupacion();
    this.resumenReservas = this.reservaService.generarResumen();
    this.vuelosDisponibles = this.vueloService.obtenerVuelosDisponibles().length;
  }
}
