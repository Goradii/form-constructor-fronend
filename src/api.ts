import axios from "axios"

const API_URL = 'https://test-app-for-extralogic.herokuapp.com/jrpc/v1/forms'

export async function sendApiQuery(method: string, params: object, id: number = 0){
    const body = {"jsonrpc": "2.0", "id": id, "method": method, "params": params}
    const response = await axios.post(API_URL, body)
    return response.data
}
