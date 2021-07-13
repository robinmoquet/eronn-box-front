import React from 'react';

const Link = ({ text, href, blank }) => (
    <a href={href} className="link" target={blank ? '_blank' : ''} rel="noreferrer">
        {text}
    </a>
);

export default Link;
