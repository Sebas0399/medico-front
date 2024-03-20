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
import { insertarPacienteFachada } from "./helpers/saveUsuario";
import { insertarSignosVitales } from "./helpers/saveSignosVitales";


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
    id: "",
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

    fechaAdmision: "",
    ocupacion: "",
    empresaTrabajo: "",
    tipoSeguro: "",
    referido: "",
    //
    contactoEmergenciaNombre: "",
    contactoEmergenciaAfinidad: "",
    contactoEmergenciaDireccion: "",
    contactoEmergenciaTelefono: "",
    //
    llegadaForma: "",
    llegadaFuente: "",
    llegadaEntrega: "",
    llegadaTelefono: "",
    //
    app: "",
    apf: "",
    alergias: "",
    aqx: "",
    ago: ""

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

  tratamiento = [{
    indicaciones: [""],
    medicamentos: [""]
  }]
  diagnostico = {
    ingreso: "",
    alta: ""
  }

  addMedicamento() {
    this.tratamiento[0].medicamentos.push("");
  }
  addIndicacion() {
    this.tratamiento[0].indicaciones.push("");
  }
  consultarUsuario() {
    if (this.paciente.cedula.length === 10) {
      obtenerPacienteFachada(this.paciente.cedula).then(r => {
        if (r != null) {
          this.paciente = r;
          console.log(r)
        }

        // this.messageService.add({
        //   severity: 'success', summary: 'Success', detail: 'Message Content'
        // })
        //this.paciente.apellidoPaterno = r.apellido;
        //this.paciente.primerNombre = r.nombre
      }).catch((err) => {
        console.log(err)
        this.messageService.add({
          severity: 'error', summary: 'Success', detail: 'Paciente no encontrado'
        })
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
    /*insertarPacienteFachada(this.paciente).then(r => {
      insertarSignosVitales(this.signosVitales).then(r2 => {
        this.messageService.add({
          severity: 'success', summary: 'Success', detail: 'Paciente guardado'
        })
      })

    }).catch(err => {
      console.log(err)
    })*/
    var historiaClinica = {
      paciente: this.paciente,
      signosVitales: null,
      tratamiento: this.tratamiento,
      diagnistico: this.diagnostico,
      enfermedadActual: this.enfermedadActual,
      examenFisico: this.examenFisico,
      tratamientos: this.tratamiento,
      diagnosticoIngreso: this.diagnostico.ingreso,
      diagnosticoAlta: this.diagnostico.alta
    }
    console.log(historiaClinica)
    insertarHistoriaClinicaFachada(historiaClinica).then(r => {
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: 'Historia Clinica insertada'
      })
    }).catch(err => {
      console.log(err)
    })
  }

}
