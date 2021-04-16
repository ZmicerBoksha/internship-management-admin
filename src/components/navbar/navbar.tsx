import React from 'react';
import { Link } from 'react-router-dom';
import './navBarStyle.scss';

const Navbar: React.FC = () => {
    return (
        <aside className="aside">
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link
                            className="menu__item-link"
                            to="/"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link
                            className="menu__item-link"
                            to="/authorization"
                        >
                            Authorization
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link
                            className="menu__item-link"
                            to="/events"
                        >
                            Events
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link
                            className="menu__item-link"
                            to="/ts"
                        >
                            TS
                        </Link>
                    </li>
                    <li className="menu__item">
                        <Link
                            className="menu__item-link"
                            to="/hrs"
                        >
                            HR
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Navbar;
