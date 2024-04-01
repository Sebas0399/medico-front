import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const obtenerPacienteFachada=async (cedula:number)=>{
    return await obtenerPacienteFachadaApi(cedula);
}
const obtenerPacienteFachadaApi= async(cedula:number)=>{
    const url=getApiUrl("pacientes/id/"+cedula);
    return await axios.get(url).then((r)=>r.data)
}

