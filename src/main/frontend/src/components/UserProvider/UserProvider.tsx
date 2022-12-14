import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [ user, setUser ] = useState<string | null>(null);

    useEffect(() => {
        const auth = JSON.parse(sessionStorage.getItem("user"));
        if (auth && !user) {
            setUser(auth);
        }
    }, [ user ]);

    const newUser = async name => {
        const response = await fetch("http://localhost:8080/player",{
            method: "POST",
            body: JSON.stringify({ name }),
            headers: { "Content-Type": "application/json" }
        });
        let auth = await response.json();
        setUser(auth);
        sessionStorage.setItem("user", JSON.stringify(auth));
        return user;
    }

    const value = { user, newUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
