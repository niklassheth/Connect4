import "./Logo.css";
import Chip from "../Chip/Chip";

function Logo() {
    //<Chip row={-2} color="yellow" />
    return <div className="Logo"><span>Connect</span><Chip row={-1} color="red" /></div>;
}

export default Logo;
