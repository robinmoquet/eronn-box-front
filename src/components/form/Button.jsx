import React from 'react';

const Button = (props) => {
    const { text, type, variant, onClick, className} = props;

    function getClass() {
        let classString = 'button';

        if (className) classString += ` ${className}`;
        
        if (variant) classString += ` button--${variant}`;
        else classString += ` button--primary`;

        return classString;
    }

    return (
        <button
            onClick={onClick}
            className={getClass()}
            type={type || 'button'}
        >
            {text}
        </button>
    );
};

export default Button;
