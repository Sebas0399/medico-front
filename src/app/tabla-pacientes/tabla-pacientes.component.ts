import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

import { FormularioPacienteComponent } from '../formulario-paciente/formulario-paciente.component';

import { obtenerPacienteNombreFachada } from './helpers/getPacientesNombre';
import { insertarHistoriaClinicaFachada } from './helpers/saveHistoriaClinica';
import { obtenerHistoriaClinicaPacienteFachada } from './helpers/getHistoriaClinicaPaciente';

import { Paciente } from '../../domain/paciente';
import { HistoriaClinica } from '../../domain/historiaClinica';

@Component({
  selector: 'app-tabla-pacientes',
  standalone: true,
  imports: [
    FormularioPacienteComponent,
    TableModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    CalendarModule,
  ],
  providers: [MessageService],

  templateUrl: './tabla-pacientes.component.html',
  styleUrl: './tabla-pacientes.component.css',
})
export class TablaPacientesComponent implements OnInit {


  constructor(private messageService: MessageService) { }
  pacientes!: Paciente[];
  actualPaciente!: Paciente;
  historiaClinicaIngresar!: HistoriaClinica;
  nombre!: '';
  historiasClinicas!: HistoriaClinica[];
  buscandoPacientes = false;
  visibleHistorias = false;
  visiblePaciente = false;
  visibleNuevaHistoria = false;


  ngOnInit(): void {
    this.actualPaciente = new Paciente();
    this.historiaClinicaIngresar = new HistoriaClinica();
  }
  consultarPorNombre() {
    this.buscandoPacientes = true;
    obtenerPacienteNombreFachada(this.nombre).then((res) => {
      this.pacientes = res;
      console.log(res, this.nombre);
    });

    this.buscandoPacientes = false;
  }
  abirHistoriaClinica(data: Paciente) {
    this.actualPaciente = data;
    obtenerHistoriaClinicaPacienteFachada(data.cedula as string).then((res) => {
      this.historiasClinicas = res;
    });
    this.visibleHistorias = true;
  }
  pacienteGuardar() {
    this.visiblePaciente = false;
  }
  guardarHistoriaClinica() {
    this.historiaClinicaIngresar.paciente = this.actualPaciente;
    insertarHistoriaClinicaFachada(this.historiaClinicaIngresar)
      .then((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Historia clinica insertada correctamente',
        });
        obtenerHistoriaClinicaPacienteFachada(this.actualPaciente.cedula as string).then((res) => {
          this.historiasClinicas = res;
        });
        this.visibleNuevaHistoria=false
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrio un error',
          detail: 'Historia clinica no insertada',
        });
      });
  }

}
