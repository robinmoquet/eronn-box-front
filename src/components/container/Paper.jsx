import React from 'react';

const Paper = ({ children, className }) => (
    <div className={className ? `${className} paper` : 'paper'}>{children}</div>
);

export default Paper;
