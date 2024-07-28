import { baseApi, GetUserUri, LoginUri } from "./apiHelper"
import { login } from "./types"


export const loginFunc = async (body: login) => {
    const res = await baseApi.post(LoginUri, body)
    return res.data;
}
export const getUser = async (body: any) => {
    const res = await baseApi.post(GetUserUri, body)
    return res.data;
}