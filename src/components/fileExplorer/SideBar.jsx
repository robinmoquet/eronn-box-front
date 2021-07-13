import React, { useState } from 'react';
import FolderSideBar from './FolderSideBar';

function SideBar({ tree }) {
    const [closeAll, setCloseAll] = useState(false);

    function handleCloseAll() {
        setCloseAll(true);
        setCloseAll(false);
    }

    return (
        <div className="side-bar">
            <div className="folder-list">
                {tree.map(el => el.type === 'dir' ? <FolderSideBar folder={el} closeAll={closeAll} handleCloseAll={handleCloseAll} /> : null)}
            </div>
        </div>
    );
}

export default SideBar;
