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

export interface Note {
    id?: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[]
}

export interface JournalAction{
    isSaving: boolean,
    messageSaved: '',
    notes: Note[],
    active: Note
}

