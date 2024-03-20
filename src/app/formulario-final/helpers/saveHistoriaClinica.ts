import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const insertarHistoriaClinicaFachada=async (hClinica:object)=>{
    return await insertarHistoriaClinicaApi(hClinica);
}
const insertarHistoriaClinicaApi= async(hClinica:object)=>{
   
    const url=getApiUrl("historia-clinica");
    return await axios.post(url,hClinica).then((r)=>r.data)
}

