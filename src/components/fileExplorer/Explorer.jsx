import React from 'react';
import Folder from './Folder';
import File from './File';

function Explorer({ currentDir }) {
    
    return (
        <div className="explorer">
            {currentDir.children 
                ? currentDir.children.map(el => el.type === 'dir' ? <Folder folder={el} /> : <File file={el} />)
                : currentDir.map(el => el.type === 'dir' ? <Folder folder={el} /> : <File file={el} />)
            }
        </div>
    );
}

export default Explorer;
