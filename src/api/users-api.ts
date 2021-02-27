import {UserType} from "../types/types";
import {instance, ResultCodesEnum} from "./api";

type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export const usersAPI = {
    getUsers: (page: number, pageSize: number, term: string | null) => {
        const termUri = !term ? '' : `&term=${term}`
        return instance.get<GetUsersResponse>(`users?page=${page}&count=${pageSize}${termUri}`).then(response => response.data)
    },
    deleteFollow: (userID: number) => {
        return instance.delete<ResponseType>(`follow/${userID}`)
    },
    postFollow: (userID: number) => {
        return instance.post<ResponseType>(`follow/${userID}`, {})
    }
}