'use client'
//TO-DO make it work (change ui when logined)
import { createContext, useState } from "react"


const AuthContext = createContext();

export function AuthProvider({children}){
    const [isLogIn, setIsLogIn] = useState(false);
    function setLogIn(){
        setIsLogIn(s => !s);
    }
    return(
        <AuthContext.Provider value = {{isLogIn, setLogIn}}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthContext;