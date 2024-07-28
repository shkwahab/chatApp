export type login = {
    email: string
    password: string
}

export type User = {
    _id: string
    _v: number
    name: string
    img: string
    created_At: Date
}
export type Auth = {
    isLogin:boolean
    user: User | null,
    token: string | null | Storage
    tokenExpiry: string | null | Storage
}


