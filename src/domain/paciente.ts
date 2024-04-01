import { HistoriaClinica } from "./historiaClinica";
export class Paciente {
    id?: number;
    cedula?: string;
    primerNombre?: string;
    segundoNombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    direccion?: string;
    numeroTelefono?: string;
    parroquia?: string;
    canton?: string;
    provincia?: string;
    fechaNacimiento?: Date;
    lugarNacimiento?: string;
    nacionalidad?: string;
    edad?: number;
    sexo?: string;
    estadoCivil?: string;
    fechaAdmision?: Date;
    tipoSeguro?: string;
    //contacto de emergencia
    contactoEmergenciaNombre?: string;
    contactoEmergenciaAfinidad?: string;
    contactoEmergenciaDireccion?: string;
    contactoEmergenciaTelefono?: string;
    //Antecedentes
    app?: string;
    apf?: string;
    alergias?: string;
    aqx?: string;
    ago?: string;
    //historia clinica
    historiasClinicas?: HistoriaClinica[]

}
