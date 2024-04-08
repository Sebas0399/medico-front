import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'pacientes', component: TablaPacientesComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
