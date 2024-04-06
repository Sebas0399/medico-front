import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';

//
import { obtenerHistoriaClinicaPacienteFachada } from './helpers/getHistoriaClinicaPaciente';
import { HistoriaClinica } from '../../domain/historiaClinica';
import { insertarHistoriaClinicaFachada } from './helpers/saveHistoriaClinica';
import { obtenerPacienteFachada } from './helpers/getPacienteId';
import { Paciente } from '../../domain/paciente';
import { Examen } from '../../domain/examen';

@Component({
  selector: 'app-tabla-historia-clinica',
  standalone: true,
  imports: [FileUploadModule,ToastModule, InputTextModule, TableModule, DialogModule, ButtonModule, ButtonModule, FormsModule, ReactiveFormsModule, TagModule],
  providers: [MessageService],
  templateUrl: './tabla-historia-clinica.component.html',
  styleUrl: './tabla-historia-clinica.component.css'
})
export class TablaHistoriaClinicaComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  historiasClinicas!: HistoriaClinica[];
  historiaClinicaIngresar!: HistoriaClinica;
  actualPaciente!: Paciente
  actualHistoriaClinica!: HistoriaClinica;
  visibleNuevaHistoria = false
  visibleAntecedentes = false
  visibleHistoriaClinica = false
  visibleExamenes=false
  examenesInsertar!: string[]
  
  ngOnInit(): void {
    this.historiaClinicaIngresar = new HistoriaClinica();
    this.actualPaciente = new Paciente();
    this.actualHistoriaClinica = new HistoriaClinica()
    this.examenesInsertar = new Array();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      obtenerHistoriaClinicaPacienteFachada(this.id).then(
        (data) => {
          this.historiasClinicas = data;
          obtenerPacienteFachada(this.id).then((pa) => {
            this.actualPaciente = pa
          })
        }
      );
    }
  }
  async guardarHistoriaClinica() {
    //this.actualPaciente.id=this.id
    this.historiaClinicaIngresar.paciente = this.actualPaciente;
    //this.historiaClinicaIngresar.fecha=new Date()
    if (this.examenesInsertar != null) {
      this.examenesInsertar.forEach((exa) => {
        const uuid = uuidv4();

        this.historiaClinicaIngresar.examenes.push({ examen: exa, ruta: '' ,id:uuid})
      })
    }
    console.log(this.historiaClinicaIngresar)

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
  addIndicaciones() {
    this.historiaClinicaIngresar.indicaciones.push("")
    //console.log(this.historiaClinicaIngresar.indicaciones)
  }
  addMedicamento() {
    this.historiaClinicaIngresar.medicamento.push("")

  }
  addExamen() {
    this.examenesInsertar.push("")
    // this.historiaClinicaIngresar.examenes.push(new Map<string,boolean>([
    //   ["",false]
    // ]))

  }
  mostrarHistoriaClinica(historiaClinica: HistoriaClinica) {
    this.visibleHistoriaClinica = true
    this.actualHistoriaClinica = historiaClinica
    console.log(this.actualHistoriaClinica)
  }

  getPendienteSubida(examenes: Array<Examen>) {
    var pendientes = 0
    if (examenes != null) {
      examenes.forEach((exa) => {
        if (exa.ruta.length == 0) {
          pendientes++
        }
      })
    }
    if (pendientes > 0) {
      return 'pendiente'
    }

    return 'ok'
  }
  mostrarExamenes(historiaClinica:HistoriaClinica){
    this.actualHistoriaClinica = historiaClinica
    this.visibleExamenes=true
  }
  onUpload(event:UploadEvent){
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });

  }
  @Input() id!: number

}
