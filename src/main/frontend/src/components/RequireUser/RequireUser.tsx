import {useUser} from "../UserProvider/UserProvider";
import {Navigate} from "react-router-dom";

export default function RequireUser({ children }) {
    const { user } = useUser();
    console.log(user);
    if (!user) {
        return <Navigate to="/signup" replace />;
    }

    return children;
}