import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';


import { obtenerPacienteNombreFachada } from './helpers/getPacientesNombre'
import { insertarPacienteFachada } from './helpers/savePaciente';
import { insertarHistoriaClinicaFachada } from './helpers/saveHistoriaClinica';
import { Paciente } from '../../domain/paciente';
import { HistoriaClinica } from '../../domain/historiaClinica';
@Component({
  selector: 'app-tabla-pacientes',
  standalone: true,
  imports: [TableModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, DialogModule,ToastModule,CalendarModule],
  providers: [MessageService],

  templateUrl: './tabla-pacientes.component.html',
  styleUrl: './tabla-pacientes.component.css'
})
export class TablaPacientesComponent implements OnInit {
  constructor(private messageService: MessageService) { }
  pacientes!: Paciente[]
  pacienteIngresar!: Paciente
  actualPaciente!:Paciente
  historiaClinicaIngresar!:HistoriaClinica
  nombre!: ""
  historiasClinicas!: HistoriaClinica[]
  buscandoPacientes = false
  visibleHistorias = false
  visiblePaciente = false
  visibleNuevaHistoria=false
  ngOnInit(): void {
    console.log(this.pacienteIngresar)
    this.pacienteIngresar = new Paciente()
    this.actualPaciente=new Paciente
    this.historiaClinicaIngresar=new HistoriaClinica()
  }
  consultarPorNombre() {
    console.log("Consultando")
    this.buscandoPacientes = true
    obtenerPacienteNombreFachada(this.nombre).then((res) => {
      this.pacientes = res;
      console.log(res, this.nombre)
    })

    this.buscandoPacientes = false
  }
  abirHistoriaClinica(data: Paciente) {
    this.actualPaciente=data
    this.historiasClinicas = data.historiasClinicas as HistoriaClinica[]
    this.visibleHistorias = true
  }
  guardarPaciente() {
    insertarPacienteFachada(this.pacienteIngresar).then((res) => {
      console.log(res)
      this.messageService.add({
        severity: 'success', summary: 'OK', detail: 'Paciente insertado correctamente'
      })
      this.pacienteIngresar=new Paciente()
      this.visiblePaciente=false

    }).catch((err)=>{
      this.messageService.add({
        severity: 'error', summary: 'Ocurrio un error', detail: 'Paciente no insertado'
      })
    })
  }
  guardarHistoriaClinica(){
    this.historiaClinicaIngresar.paciente=this.actualPaciente
    insertarHistoriaClinicaFachada(this.historiaClinicaIngresar).then((res)=>{
      this.messageService.add({
        severity: 'success', summary: 'OK', detail: 'Historia clinica insertada correctamente'
      })
    }).catch((err)=>{
      this.messageService.add({
        severity: 'error', summary: 'Ocurrio un error', detail: 'Historia clinica no insertada'
      })
    })
  }
}
