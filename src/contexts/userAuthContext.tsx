import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase-config';

const userAuthContext = createContext<any>(null);

export const UserAuthContextProvider = ({children}: {children: JSX.Element}) => {
    const [ user, setUser ] = useState<any>();

    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut(): void {
        signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <userAuthContext.Provider value={{user, logIn, signUp, logOut, googleSignIn}}>
            {children}
        </userAuthContext.Provider>
    )

}

export function useUserAuth() {
    return useContext(userAuthContext);
}

