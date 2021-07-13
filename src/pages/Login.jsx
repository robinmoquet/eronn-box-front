/** @format */

import React from 'react';
import SigninForm from '../form/SigninForm';
import Title from '../components/typo/Title';
import Wrap from '../components/container/Wrap';
import Footer from '../components/container/Footer';
import NavBar from '../components/container/NavBar';
import AnimationIntersectionObserver from '../animations/AnimationIntersectionObserver';

const Login = () => (
    <AnimationIntersectionObserver>
        <div className="login-page">
            <NavBar />
            <Wrap>
                <section className="login reveal">
                    <Title
                        text="Se connecter"
                        className="login__title reveal-1"
                        tonic
                    />
                    <SigninForm />
                </section>
            </Wrap>
            <Footer />
        </div>
    </AnimationIntersectionObserver>
);

export default Login;
