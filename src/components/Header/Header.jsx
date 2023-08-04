import "./Header.css";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <h1>React Example</h1>
            <nav>
                <NavLink to="/" className={({ isActive }) =>
                    isActive ? "active" : ''
                }>Home</NavLink>
                <NavLink to="/users" className={({ isActive }) =>
                    isActive ? "active" : ''
                }>Users</NavLink>
                <NavLink to="/photos" className={({ isActive }) =>
                    isActive ? "active" : ''
                }>Images</NavLink>
            </nav>
        </header>
    );
}
export default Header;