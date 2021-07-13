import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECT_NAME } from '../../config/global';
import { path } from '../../router/routes';
import {useAuth} from "../../auth/hooks/useAuth";

const NavBar = () => {

    const auth = useAuth();

    const handleClickThemePicker = (event) => {
        event.preventDefault();
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        } else if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('prac-mode');
        } else {
            document.body.classList.remove('prac-mode');
            document.body.classList.add('light-mode');
        }
    };

    return (
        <div className="nav-bar wrapper">
            <div className="nav-bar__content">
                <Link to={path('home')}>
                    <h3 className="nav-bar__logo">{PROJECT_NAME}</h3>
                </Link>
            </div>
            <div className="nav-bar__actions">
                <a
                    href="/theme"
                    className="theme-picker"
                    onClick={handleClickThemePicker}
                >
                    <i className="material-icons">invert_colors</i>
                </a>
                {auth.user && (
                    <a href="/logout" className="icon" onClick={event => {event.preventDefault(); auth.signout();}}>
                        <i className="material-icons">logout</i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default NavBar;
