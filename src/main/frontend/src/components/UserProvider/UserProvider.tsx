import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext(null);

export const useUser = () => {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const newUser = async name => {
        const response = await fetch('http://localhost:8080/player',
            {method: 'POST',
                body: JSON.stringify({name}),
                headers: {'Content-Type': 'application/json'}})
            .then(x => x.json());
        setUser(response);
        return user;
    }
    const value = {user, newUser};
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

