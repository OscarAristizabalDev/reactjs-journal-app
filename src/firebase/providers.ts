import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { Auth, AuthAction, LoginPage, RegistarPage } from '../interfaces';


const googleProvider = new GoogleAuthProvider();

// Permite autenticarse con google usando FireBase
export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        // se obtiene valores que nos interesan de la autenticacion
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            // UserInfo
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUser = async ({ email, password, displayName }: RegistarPage) => {

    try {

        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;

        // Actualizar el displayName en firebase
        await updateProfile(FirebaseAuth.currentUser!, { displayName })

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const loginUser = async ({ email, password }: LoginPage) => {
    try {

        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = response.user;

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutUser = async () => {
    try {
        await FirebaseAuth.signOut();

        return {
            ok: true,
            errorMessage: ''
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}