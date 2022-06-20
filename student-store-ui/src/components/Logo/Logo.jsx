import logo from "./Logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {

    return (
        <span className="logo">
            <Link to="/">
                <img src={logo} width="60px" />
            </Link>
        </span>
    );
}
