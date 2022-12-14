import { useUser } from "../UserProvider/UserProvider";
import { Navigate } from "react-router-dom";

export default function RequireUser({ children }) {
    // fetch user from the User context, will be null if a user is not signed up
    const { user } = useUser();

    // if the user is not signed up, send them to the signup page
    if (!user) {

        // users who have signed up should not be redirected to signup
        if (sessionStorage.getItem('user')) {
            return <Navigate to="/" replace />;
        }

        return <Navigate to="/signup" replace />;
    }

    return children;
}
