import React from 'react';
import NavBar from '../components/container/NavBar';
import Wrapper from '../components/container/Wrap';
import Button from "../components/form/Button";
import {useHistory} from "react-router-dom";
import {path} from "../router/routes";

const Home = () => {
    const history = useHistory();

    return (
        <div className="home-page">
            <NavBar/>
            <Wrapper>
                <Button text="Containers" onClick={() => history.push(path('containerList'))}/>
            </Wrapper>
        </div>
    );
};
export default Home;
