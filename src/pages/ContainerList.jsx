import React from 'react';
import NavBar from '../components/container/NavBar';
import ContainerList from '../components/ContainerList';
import Wrapper from '../components/container/Wrap';

const ContainerListPage = () => (

    <div className="container-list-page">
        <NavBar />
        <Wrapper>
            <div className="container-container-list">
                <ContainerList />
            </div>
        </Wrapper>
    </div>
);
export default ContainerListPage;
