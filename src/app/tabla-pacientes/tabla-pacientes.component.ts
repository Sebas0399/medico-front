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
import { TablaHistoriaClinicaComponent } from '../tabla-historia-clinica/tabla-historia-clinica.component';

import { obtenerPacienteNombreFachada } from './helpers/getPacientesNombre';

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
    TablaHistoriaClinicaComponent
  ],
  providers: [MessageService],

  templateUrl: './tabla-pacientes.component.html',
  styleUrl: './tabla-pacientes.component.css',
})
export class TablaPacientesComponent implements OnInit {


  constructor(private messageService: MessageService) { }
  pacientes!: Paciente[];
  actualPaciente!: Paciente;
  nombre!: '';
  historiasClinicas!: HistoriaClinica[];
  buscandoPacientes = false;
  visibleHistorias = false;
  visiblePaciente = false;
  visibleNuevaHistoria = false;

  //
  historiaClinicaid: any
  ngOnInit(): void {
    this.actualPaciente = new Paciente();
  }
  async consultarPorNombre() {
    this.buscandoPacientes = true;
    await obtenerPacienteNombreFachada(this.nombre).then((res) => {
      this.pacientes = res;
    });
    this.buscandoPacientes = false;
  }
  abirHistoriaClinica(id: number) {
    this.historiaClinicaid = id
    // obtenerHistoriaClinicaPacienteFachada(data.cedula as string).then((res) => {
    //   this.historiasClinicas = res;
    // });
    this.visibleHistorias = true;
  }
  pacienteGuardar() {
    this.visiblePaciente = false;
  }


}
