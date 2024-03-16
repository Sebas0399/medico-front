import { Component } from '@angular/core';
import jsonData from '../../assets/datos.json';
//
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

//
import { obtenerPacienteFachada } from "./helpers/getUsuario";
import { insertarHistoriaClinicaFachada } from "./helpers/saveHistoriaClinica";


@Component({
  selector: 'app-formulario-final',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, InputSwitchModule, FormsModule, ReactiveFormsModule, InputTextareaModule, KeyFilterModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './formulario-final.component.html',
  styleUrl: './formulario-final.component.css'
})
export class FormularioFinalComponent {
  constructor(private messageService: MessageService) { }

  visible: boolean = false
  datosMap = jsonData
  provincias = [{ codigo: "", nombre: "", cantones: {} }]
  listCantones = [{ codigo: "", nombre: "", parroquias: {} }]
  listParroquias = [{ codigo: "", nombre: "" }]
  selectedProvincia = { codigo: "", nombre: "" }
  selectedCanton = { codigo: "", nombre: "" }
  selectedParroquia = { codigo: "", nombre: "" }
  paciente = {
    apellidoPaterno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    cedula: "",
    direccion: "",
    barrio: "",
    parroquiaPaciente: "",
    cantonPaciente: "",
    provinciaPaciente: "",
    numeroTelefono: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    nacionalidad: "",
    grupoCultural: "",
    edad: "",
    sexo: "",
    estadoCivil: "",
    instruccionEducativa: "",
    antecedentes: {
      app: "",
      apf: "",
      alergias: "",
      aqx: "",
      ago: ""
    }
  }
  signosVitales = {
    pa: "",
    fc: "",
    temperatura: "",
    peso: "",
    talla: "",
    so2: "",
    pc: "",
  }


  enfermedadActual = ""
  examenFisico = ""
  indicaciones = [""]
  medicamentos = [""]
  diagIngreso = ""
  diagAlta = ""
  addMedicamento() {
    this.medicamentos.push("");
  }
  addIndicacion() {
    this.indicaciones.push("");
  }
  consultarUsuario() {
    if (this.paciente.cedula.length === 10) {
      obtenerPacienteFachada(this.paciente.cedula).then(r => {
        this.paciente = r;
        console.log(r)
        // this.messageService.add({
        //   severity: 'success', summary: 'Success', detail: 'Message Content'
        // })
        //this.paciente.apellidoPaterno = r.apellido;
        //this.paciente.primerNombre = r.nombre
      }).catch((err) => {

      });
    }
  }
  loadItems() {
    for (let i = 0; i < this.datosMap.length; i++) {
      this.provincias.push({ codigo: this.datosMap[i].codigo, nombre: this.datosMap[i].nombre, cantones: this.datosMap[i].cantones });
    }




  }
  listarCantones() {
    console.log("Provincia seleccionada:", this.selectedProvincia);
    this.listParroquias = [{ codigo: "", nombre: "" }]

    this.datosMap.filter((p) => {
      if (p.nombre === this.selectedProvincia.nombre) {
        //Object.values(p.cantones).at
        this.listCantones = Object.values(p.cantones)


      }

    })

  }
  listarParroquias() {
    this.listCantones.filter((c) => {
      if (c.nombre === this.selectedCanton.nombre) {
        this.listParroquias = Object.values(c.parroquias)

      }
    })
  }
  listarProvincias() {
    this.listParroquias = [{ codigo: "", nombre: "" }]
  }
  ngOnInit() {
    this.loadItems();

  }
  showDialog() {
    this.visible = true;
  }
  guardarHistoriaClinica() {
    var historiaClinica = {
      paciente: this.paciente,
      enfermedadActual: this.enfermedadActual,
      examenFisico: this.examenFisico,
      diagnosticoIngreso: this.diagIngreso,
      diagnosticoAlta: this.diagAlta,
    }
    console.log(historiaClinica)
    insertarHistoriaClinicaFachada(historiaClinica)
  }

}
