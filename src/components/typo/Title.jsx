import React from 'react';

const Title = ({ text, className, tonic, subTitle }) => {
    let classValue = subTitle ? 'sub-title' : 'title';
    if (tonic) classValue += ' tonic';
    if (className) classValue += ` ${className}`;

    return (
        <div className={classValue}>
            <h2>{text}</h2>
        </div>
    );
};

export default Title;
