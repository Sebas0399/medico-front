import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-formulario-paciente',
  standalone: true,
  imports: [InputTextModule,ButtonModule],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent {
  nombre = "Sebas"
  estaRegistrado = true
}
