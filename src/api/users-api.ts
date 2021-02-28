import {UserType} from "../types/types";
import {instance, ResultCodesEnum} from "./api";

type GetUsersResponse = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export const usersAPI = {
    getUsers: (page: number, pageSize: number, termUri: string, friendUri: string) => {
        return instance.get<GetUsersResponse>(`users?page=${page}&count=${pageSize}${termUri}${friendUri}`)
            .then(response => response.data)
    },
    deleteFollow: (userID: number) => {
        return instance.delete<ResponseType>(`follow/${userID}`)
    },
    postFollow: (userID: number) => {
        return instance.post<ResponseType>(`follow/${userID}`, {})
    }
}