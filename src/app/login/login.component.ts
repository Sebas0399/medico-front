import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router"

//
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { loginFachada } from './helpers/login';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, KeyFilterModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private localStorageService: LocalStorageService) { }

  nuevoUsuario!: Usuario;
  loginForm!: FormGroup
  ngOnInit(): void {
    this.nuevoUsuario = new Usuario()
    this.loginForm = new FormGroup({
      userName: new FormControl(this.nuevoUsuario.userName,
        [Validators.required,
        Validators.minLength(10),
          // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ),
      password: new FormControl(this.nuevoUsuario.password,
        [Validators.required,
        Validators.minLength(8)])
    })
  }
  login() {
    console.log("LOG")
    const isFormValid = this.loginForm.valid
    this.nuevoUsuario.userName = this.loginForm.get('userName')?.value
    this.nuevoUsuario.password = this.loginForm.get('password')?.value

    if (isFormValid) {
      loginFachada(this.nuevoUsuario).then((res) => {
        this.localStorageService.setItem('JWT_TOKEN', res.jwt)
        this.router.navigate(['/pacientes'])
      })
    }
    console.log(isFormValid)

  }
}
