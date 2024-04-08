import axios from "axios";
import { getApiUrl } from "../../utils/apiUtils";
import { Usuario } from "../../../domain/usuario";

export const loginFachada = async (usuario: Usuario) => {
    return await loginApi(usuario);
}
const loginApi = async (usuario: Usuario) => {
    console.log(usuario)
    const url = getApiUrl("auth");
    return await axios.post(url, usuario).then((r) => r.data)
}

