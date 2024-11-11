import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext); //useContext hook to specify which global context to use

const GlobalProvider = ({children}) => { //
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[user, setUser] = useState(null);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((res) => {
            if(res){
                setIsLoggedIn(true);
                setUser(res);
                //console.log("User is logged in:", res);
            } else {
                setIsLoggedIn(false);
            }
        }).catch((error) => {
            console.log( "Error from GlobalProvider:", error);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            setIsLoading
        }} >

            {children}



        </GlobalContext.Provider>
    )
}

export default GlobalProvider;