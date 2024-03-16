import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';
import { FormularioFinalComponent } from './formulario-final/formulario-final.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormularioPacienteComponent,FormularioFinalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medico-front';
  city = 'Quito';
}
