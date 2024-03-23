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
    grupoCultural?: string;
    edad?: number;
    sexo?: string;
    estadoCivil?: string;
    instruccionEducativa?: string;
    fechaAdmision?: Date;
    ocupacion?: string;
    empresaTrabajo?: string;
    tipoSeguro?: string;
    referido?: string;
    contactoEmergenciaNombre?: string;
    contactoEmergenciaAfinidad?: string;
    contactoEmergenciaDireccion?: string;
    contactoEmergenciaTelefono?: string;
    llegadaForma?: string;
    llegadaFuente?: string;
    llegadaEntrega?: string;
    llegadaTelefono?: string;
    app?: string;
    apf?: string;
    alergias?: string;
    aqx?: string;
    ago?: string;
    historiasClinicas?:HistoriaClinica[]
    
}
