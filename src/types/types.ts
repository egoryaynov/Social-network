export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type FriendType = {
    id: number,
    name: string
}

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    text: string
}

export type LoginInfoType = {
    captcha: string | null,
    email: string,
    isRememberMe: boolean,
    password: string
}
export type UpdateProfileInfoPayloadType = {
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    aboutMe?: string
    contacts: ContactsType
}