'use client'

import { createContext, useEffect, useState } from "react"


const AuthContext = createContext();


export function AuthProvider({children}){
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            setIsLogIn(false);
        }
        else{
            setIsLogIn(true);
        }
    }, [])
    const [isLogIn, setIsLogIn] = useState(false);
   
    return(
        <AuthContext.Provider value = {{isLogIn, setIsLogIn}}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthContext;