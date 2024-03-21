import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const obtenerPacienteFachada=async (cedula:string)=>{
    return await obtenerPacienteApi(cedula);
}
const obtenerPacienteApi= async(cedula:string)=>{
    const url=getApiUrl("pacientes/"+cedula);
    return await axios.get(url).then((r)=>r.data)
}

