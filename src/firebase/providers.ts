import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { Auth, AuthAction, RegistarPage } from '../interfaces';


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

        console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
    }

} 