import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const obtenerPacienteNombreFachada=async (nombre:string)=>{
    return await obtenerPacienteNombreApi(nombre);
}
const obtenerPacienteNombreApi= async(nombre:string)=>{
    const url=getApiUrl("pacientes/nombre/"+nombre);
    console.log(url)

    return await axios.get(url).then((r)=>r.data)
}

