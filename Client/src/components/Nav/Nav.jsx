import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Nav.module.css";

let { container, contButton, Button, ButtonAct, containerHidden } = style;

const Nav = (props) => {
    const [optActive, setOptActive] = useState(1);
    const [showSearch, setShowSearch] = useState(true);
    const { onSearch, logout, hide } = props;

    const HOME = import.meta.env.VITE_HOME || '/home';
    const ABOUT = import.meta.env.VITE_ABOUT || '/about';
    const FAVORITES = import.meta.env.VITE_FAVORITES || '/favorites';

    const handleActive = (index) => {
        setOptActive(index);
        if (index === 1) { setShowSearch(true) } else { setShowSearch(false) };
    };

    return (
        // oculto la barra de navegación si hay error 404:
        <div className={`${hide ? containerHidden : container}`}>
            <p className={contButton}>
                <Link to={HOME}>
                    <button className={`${optActive === 1 ? ButtonAct : Button}`} onClick={() => handleActive(1)}>Cards</button>
                </Link>
            </p>
            <p className={contButton}>
                <Link to={ABOUT}>
                    <button className={`${optActive === 2 ? ButtonAct : Button}`} onClick={() => handleActive(2)}>About</button>
                </Link>
            </p>
            <p className={contButton}>
                <Link to={FAVORITES}>
                    <button className={`${optActive === 3 ? ButtonAct : Button}`} onClick={() => handleActive(3)}>Favorites</button>
                </Link>
            </p>
            <p className={contButton}>
                <button className={Button} onClick={() => { logout(); }}>Logout</button>
            </p>
            <SearchBar onSearch={onSearch} showSearch={showSearch} />
        </div >
    );
}
export default Nav


