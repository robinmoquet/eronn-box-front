import React, { useState } from 'react';

const FolderSideBar = ({ folder, closeAll, handleCloseAll }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        handleCloseAll()
        setIsSelected(!isSelected);
    }

    function openFolder() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="folder-side-bar">
            <div className={isSelected && !closeAll ? 'folder selected' : 'folder'} onClick={handleClick}>
                <span class="material-icons" onClick={openFolder}>{isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</span>
                <span class="material-icons">folder_open</span>
                <span className="folder__name">{folder.name}</span>
            </div>
            <div className={isOpen ? "open folder-children" : "folder-children"}>
                {folder.children.map(el => el.type === 'dir' ? <FolderSideBar folder={el} closeAll={closeAll} handleCloseAll={handleCloseAll} /> : null)}
            </div>
        </div>
    );
}

export default FolderSideBar;
