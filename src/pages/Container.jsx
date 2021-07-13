import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { add } from '../reducer/containerTreeReducer';
import NavBar from '../components/container/NavBar';
import FileExplorer from '../components/fileExplorer/FileExplorer';
import { apiGetTreeContainer } from '../api/request';

const Container = () => {
    let { keysecure } = useParams();
    const container = useSelector((state) => state.containersTree.value[keysecure]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (container === undefined) {
            async function fetchData() {
                const res = await apiGetTreeContainer(keysecure);
                dispatch(add(res));
            }
            fetchData();
        }
    });

    return (
        <div className="home-page">
            <NavBar />
            {container && <FileExplorer container={container} />}
        </div>
    );
};
export default Container;
