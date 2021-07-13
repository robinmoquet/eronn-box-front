import React, { useState } from 'react';
import SideBar from './SideBar';
import Explorer from './Explorer';
import BreadcrumbList from './BreadcrumbList';

function FileExplorer({ container }) {
    const [currentDir, setCurrentDir] = useState(container.tree);
    
    return (
        <div className="file-explorer">
            <div className="side-bar-container">
                <SideBar tree={container.tree} setCurrentDir={setCurrentDir} />
            </div>
            <div className="explorer-container">
                <BreadcrumbList />
                <Explorer currentDir={currentDir} />
            </div>
            
        </div>
    );
}

export default FileExplorer;
