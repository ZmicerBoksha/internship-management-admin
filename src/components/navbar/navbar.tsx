import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './navBarStyle.scss';

const Navbar: React.FC = () => {
    let [currentLink, currentLinkEdit] = useState<string>('dashboard');
    return (
        <aside className="aside">
            <nav className="menu">
                <ul className="menu__list">

                    <li onClick={() => {currentLinkEdit("dashboard")}}
                        className={currentLink === "dashboard" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("authorization")}
                        className={currentLink === "authorization" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/authorization"
                        >
                            Authorization
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("events")}
                        className={currentLink === "events" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/events"
                        >
                            Events
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("ts")}
                        className={currentLink === "ts" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/ts"
                        >
                            TS
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("hrs")}
                        className={currentLink === "hrs" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/hrs"
                        >
                            HR
                        </Link>
                    </li>
                    <li onClick={() => currentLinkEdit("add")}
                        className={currentLink === "add" ? "menu__item menu__item-link--active" : "menu__item"}>
                        <Link
                            className="menu__item-link"
                            to="/staff/add"
                        >
                            Staff add
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Navbar;
