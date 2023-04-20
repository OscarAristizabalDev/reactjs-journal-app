export interface Auth {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
}


export interface AuthAction {
    auth: Auth
    errorMessage: string
    status: string, // 'not-authenticated', 'authenticated'
    ok: boolean
}

export interface RegistarPage {
    email: string,
    password: string,
    displayName: string
}

export interface LoginPage {
    email: string,
    password: string
}