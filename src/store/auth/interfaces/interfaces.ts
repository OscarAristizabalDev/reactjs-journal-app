export interface Auth {
    status: string, // 'not-authenticated', 'authenticated'
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    errorMessage: string
}


export interface AuthAction {
    Auth: Auth
}