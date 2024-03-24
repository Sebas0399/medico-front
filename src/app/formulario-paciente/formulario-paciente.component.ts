import { Component, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Paciente } from '../../domain/paciente';
import { InputMaskModule } from 'primeng/inputmask';

import { insertarPacienteFachada } from './helpers/savePaciente';
import { ToastModule } from 'primeng/toast';
import * as Yup from 'yup';
import { setLocale } from 'yup';

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
  ],
  providers: [MessageService],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css',
})
export class FormularioPacienteComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter();
  constructor(private messageService: MessageService) {}

  pacienteIngresar!: Paciente;

  validationSchema: Yup.Schema<Paciente> = Yup.object({
    cedula: Yup.string()
      .required('Cédula obligatoria')
      .min(10, 'Cédula no válida'),
    fechaNacimiento: Yup.date().required('Fecha de nacimiento obligatoria'),
  });

  ngOnInit(): void {
    this.pacienteIngresar = new Paciente();
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
            //      this.visiblePaciente=false
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
        console.log(err);
        this.messageService.add({
          key: 'toastPaciente',
          severity: 'error',
          summary: 'OK',
          detail: err,
        });
      });
  }
}
