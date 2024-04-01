import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const obtenerHistoriaClinicaPacienteFachada=async (cedula:number)=>{
    return await obtenerHistoriaClinicaPacienteFachadaApi(cedula);
}
const obtenerHistoriaClinicaPacienteFachadaApi= async(cedula:number)=>{
    const url=getApiUrl("historia-clinica/"+cedula+"/paciente");
    return await axios.get(url).then((r)=>r.data)
}

