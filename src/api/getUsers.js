import axios from "axios";

const API_KEY = '57abead5-1e9d-4267-834c-63b518df6e79';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': API_KEY
    }
});

export const usersAPI = {
    getUsers: (page, pageSize) => {
        return instance.get(`users?page=${page}&count=${pageSize}`).then(response => response.data)
    },
    deleteFollow: (userID) => {
        return instance.delete(`follow/${userID}`)
    },
    postFollow: (userID) => {
        return instance.post(`follow/${userID}`, {})
    },
    getAuth: () => {
        return instance.get(`auth/me`).then(response => response.data)
    },
    getUserProfile: (userID) => {
        return instance.get(`profile/${userID}`).then(response => response.data)
    }
}
