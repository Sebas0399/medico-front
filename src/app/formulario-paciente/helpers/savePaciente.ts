import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const insertarPacienteFachada=async (paciente:object)=>{
    return await insertaPacienteApi(paciente);
}
const insertaPacienteApi= async(paciente:object)=>{
   
    const url=getApiUrl("pacientes");
    return await axios.post(url,paciente).then((r)=>r.data)
}

