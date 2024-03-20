import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";

export const insertarSignosVitales=async (signosVitales:object)=>{
    return await insertarSignosVitalesApi(signosVitales);
}
const insertarSignosVitalesApi= async(signosVitales:object)=>{
   
    const url=getApiUrl("signos-vitales");
    return await axios.post(url,signosVitales).then((r)=>r.data)
}

