import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    const newUser = async name => {
        const response = await fetch('http://localhost:8080/player',{
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        });
        setUser(await response.json());
        localStorage.setItem('user', JSON.stringify(user))
        return user;
    }

    const value = { user, newUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
