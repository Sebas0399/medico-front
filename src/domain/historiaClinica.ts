import { Paciente } from "./paciente";
export class HistoriaClinica {
    id?: number;
    paciente: Paciente;
    numHist: string;
    enfermedadActual: string;
    examenFisico: string;
    diagnosticoIngreso: string;
    diagnosticoAlta: string;
    fecha:Date
}