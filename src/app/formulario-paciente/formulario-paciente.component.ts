import { Component, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Paciente } from '../../domain/paciente';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import { insertarPacienteFachada } from './helpers/savePaciente';
import { ToastModule } from 'primeng/toast';
import * as Yup from 'yup';
import jsonData from '../../assets/datos.json';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css',
})
export class FormularioPacienteComponent implements OnInit {

  // //
  datosMap = jsonData
  provincias = [{ codigo: "", nombre: "", cantones: {} }]
  selectedProvincia = { codigo: "", nombre: "" }
  selectedCanton = { codigo: "", nombre: "" }
  selectedParroquia = { codigo: "", nombre: "" }
  listCantones = [{ codigo: "", nombre: "", parroquias: {} }]
  listParroquias = [{ codigo: "", nombre: "" }]
  //
  sexoList = ["Masculino", "Femenino"]
  estadoCivilList = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"]
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter();
  constructor(private messageService: MessageService) { }

  pacienteIngresar!: Paciente;

  validationSchema: Yup.Schema<Paciente> = Yup.object({
    cedula: Yup.string()
      .min(10, 'Cédula no válida'),
    fechaAdmision: Yup.date().required('Fecha de admisión obligatoria'),
    apellidoPaterno: Yup.string().required('Apellido paterno obligatorio'),
    primerNombre:Yup.string().required('Primer nombre obligatorio'),
    numeroTelefono:Yup.string().required('Número de teléfono obligatorio')
  });

  ngOnInit(): void {
    this.pacienteIngresar = new Paciente();
    this.loadItems()
  }
  async guardarPaciente() {
    await this.validationSchema
      .validate(this.pacienteIngresar)
      .then((res) => {
        insertarPacienteFachada(this.pacienteIngresar)
          .then((res) => {
            this.messageService.add({
              key: 'toastPaciente',
              severity: 'success',
              summary: 'OK',
              detail: 'Paciente insertado correctamente',
            });

            this.pacienteIngresar = new Paciente();
            this.saveSuccess.emit(null);
          })
          .catch((err) => {
            this.messageService.add({
              key: 'toastPaciente',
              severity: 'error',
              summary: 'Ocurrio un error',
              detail: 'Paciente no insertado',
            });
          });
      })
      .catch((err) => {
        this.messageService.add({
          key: 'toastPaciente',
          severity: 'warn',
          summary: 'Error',
          detail: err.errors,
        });
      });
  }
  loadItems() {
    for (let i = 0; i < this.datosMap.length; i++) {
      this.provincias.push({ codigo: this.datosMap[i].codigo, nombre: this.datosMap[i].nombre, cantones: this.datosMap[i].cantones });
    }
  }

  listarCantones() {
    this.pacienteIngresar.provincia = this.selectedProvincia.nombre
    this.listParroquias = [{ codigo: "", nombre: "" }]

    this.datosMap.filter((p) => {
      if (p.nombre === this.selectedProvincia.nombre) {
        //Object.values(p.cantones).at
        this.listCantones = Object.values(p.cantones)
      }
    })

  }
  listarParroquias() {
    console.log(this.selectedCanton)
    this.pacienteIngresar.canton = this.selectedCanton.nombre;
    this.listCantones.filter((c) => {
      if (c.nombre === this.selectedCanton.nombre) {
        this.listParroquias = Object.values(c.parroquias)
      }
    })
  }
  seleccionarParroquia() {
    this.pacienteIngresar.parroquia = this.selectedParroquia.nombre
  }
}
