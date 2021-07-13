import React, { useState } from 'react';

const Folder = ({ folder }) => {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        setIsSelected(!isSelected);
    }

    return (
        <div className={isSelected ? 'folder selected' : 'folder'} onClick={handleClick}>
                <span class="material-icons">folder</span>
                <span className="folder__name">{folder.name}</span>
        </div>
    );
}

export default Folder;
