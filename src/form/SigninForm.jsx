/** @format */

import React, {useEffect, useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/form/InputField';
import Button from '../components/form/Button';
import Paper from '../components/container/Paper';
import {STATUS} from "../config/api";
import {useAuth} from "../auth/hooks/useAuth";
import {useHistory} from "react-router-dom";
import {path} from "../router/routes";

const SignInForm = () => {
    const [errorApiMessage, setErrorApiMessage] = useState(null);
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (auth.user) history.push(path('home'));
    })

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string().required(),
    });

    const loginCallApi = async (values) => {
        let res = await auth.signin(values);
        if (res.status === STATUS.ERROR) setErrorApiMessage(res.message);
        else {
            setErrorApiMessage(null);
            history.push(path('home'));
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={loginCallApi}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Paper className="reveal-2">
                        <InputField
                            id="email"
                            label="Adresse mail :"
                            name="email"
                            type="email"
                            placeholder="john-doe@email.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                        />
                        <InputField
                            id="password"
                            label="Mot de passe :"
                            name="password"
                            type="password"
                            isPassword
                            placeholder="••••••••••••••••••"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            touched={formik.touched.password}
                            error={formik.errors.password}
                        />
                        {errorApiMessage && <span className="error">{errorApiMessage}</span>}
                    </Paper>

                    <div className="login__bottom-action reveal-3">
                        <Button text="Connexion" type="submit" />
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default SignInForm;
