import React, { useState } from 'react';

const File = ({ file }) => {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        setIsSelected(!isSelected);
    }

    return (
        <div className={isSelected ? 'file selected' : 'file'} onClick={handleClick}>
                <span class="material-icons">description</span>
                <span className="file__name">{file.name}</span>
        </div>
    );
}

export default File;
