/** @format */

import React from 'react';
import Link from '../Link';

const Footer = () => (
    <div className="footer wrapper">
        <p>Aucun droit réserver ©</p>
        <p>
            Retrouver le projet sur <Link
                text="GitHub"
                href="https://github.com/robinmoquet/eronn-box-front"
                blank
            />
        </p>
    </div>
);

export default Footer;
