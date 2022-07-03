import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase-config';



const userAuthContext = createContext<any>(null);

export const UserAuthContextProvider = ({children}: any) => {
    const [ user, setUser ] = useState<any>({});

    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut(): void {
        signOut(auth);
    } 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth', currentUser);
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <userAuthContext.Provider value={{user, logIn, signUp, logOut}}>
            {children}
        </userAuthContext.Provider>
    )

}

export function useUserAuth() {
    return useContext(userAuthContext);
}

