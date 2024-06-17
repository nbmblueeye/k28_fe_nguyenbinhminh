import axios from "axios";
import API_URL from "../../../config";

const createApi = (accessToken="") => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json"
        }
    })
}

export default createApi