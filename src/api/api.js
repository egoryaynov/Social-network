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
    }
}

export const profileAPI = {
    getUserProfile: (userID) => {
        return instance.get(`profile/${userID}`).then(response => response.data)
    },
    getStatus: (userID) => {
        return instance.get(`profile/status/${userID}`).then(response => response.data)
    },
    updateStatus: (status) => {
        return instance.put('profile/status', {status: status})
    },
    savePhoto: (photoFile) => {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    updateProfileInfo: (profileInfo) => {
        return instance.put('profile', profileInfo).then(response => response.data)
    }
}

export const authAPI = {
    getAuth: () => {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login: (loginInfo) => {
        return instance.post('/auth/login', loginInfo).then(response => response.data)
    },
    logout: () => {
        return instance.delete('/auth/login').then(response => response.data)
    }
}

export const securityAPI = {
    getCaptcha: () => {
        return instance.get('security/get-captcha-url').then(response => response.data)
    }
}