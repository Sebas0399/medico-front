import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
//
import { obtenerHistoriaClinicaPacienteFachada } from './helpers/getHistoriaClinicaPaciente';
import { HistoriaClinica } from '../../domain/historiaClinica';
import { insertarHistoriaClinicaFachada } from './helpers/saveHistoriaClinica';
import { obtenerPacienteFachada } from './helpers/getPacienteId';
import { Paciente } from '../../domain/paciente';

@Component({
  selector: 'app-tabla-historia-clinica',
  standalone: true,
  imports: [ToastModule, InputTextModule, TableModule, DialogModule, ButtonModule, ButtonModule, FormsModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './tabla-historia-clinica.component.html',
  styleUrl: './tabla-historia-clinica.component.css'
})
export class TablaHistoriaClinicaComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  historiasClinicas!: HistoriaClinica[];
  historiaClinicaIngresar!: HistoriaClinica;
  actualPaciente!: Paciente
  visibleNuevaHistoria = false
  visibleAntecedentes=false
  ngOnInit(): void {
    this.historiaClinicaIngresar = new HistoriaClinica();
    this.actualPaciente = new Paciente();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      obtenerHistoriaClinicaPacienteFachada(this.id).then(
        (data) => {
          this.historiasClinicas = data;
          obtenerPacienteFachada(this.id).then((pa)=>{
            this.actualPaciente=pa
          })
        }
      );
    }
  }
  async guardarHistoriaClinica() {
    //this.actualPaciente.id=this.id
    this.historiaClinicaIngresar.paciente = this.actualPaciente;
    this.historiaClinicaIngresar.fecha=new Date()
    console.log(new Date())
    await insertarHistoriaClinicaFachada(this.historiaClinicaIngresar)
      .then((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'OK',
          detail: 'Historia clinica insertada correctamente',
        });
         obtenerHistoriaClinicaPacienteFachada(this.id).then((res) => {
           this.historiasClinicas = res;
         });
        this.visibleNuevaHistoria = false
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrio un error',
          detail: 'Historia clinica no insertada',
        });
      });
  }
  @Input() id!: number

}
