import {useUser} from "../UserProvider/UserProvider";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";

export default function RequireUser({ children }) {
    const { user } = useUser();

    if (!user) {
        if (localStorage.getItem('user')) {
            return <Navigate to="/" replace />;
        }
        return <Navigate to="/signup" replace />;
    }

    return children;
}