import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { FormularioPacienteComponent } from './formulario-paciente/formulario-paciente.component';
import { FormularioFinalComponent } from './formulario-final/formulario-final.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormularioPacienteComponent,FormularioFinalComponent,TablaPacientesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'medico-front';
  city = 'Quito';
}
