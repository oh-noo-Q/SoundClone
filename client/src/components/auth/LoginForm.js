import React from 'react';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import { LOCAL_STORAGE_FULLNAM } from '../../contexts/Constants';

const LoginForm = ({ authImg }) => {

    // context
    const { loginUser } = useContext(AuthContext);

    // router
    const navigate = useNavigate();

    // local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    // alert if login failed
    const [alertLoginFailed, setAlertLoginFailed] = useState((
        <div></div>
    ))

    const { username, password } = loginForm;

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })


    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                localStorage.setItem(LOCAL_STORAGE_FULLNAM, loginData.fullname);
                setAlertLoginFailed((<div></div>))
                navigate('/discovery');
            } else {
                setAlertLoginFailed((
                    <div className='alert-login'>Login failed: Wrong username or password</div>
                ));
                setTimeout(() => setAlertLoginFailed((<div></div>)), 5000);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const { authState } = useContext(AuthContext);

    if (authState.authLoading) {
        return (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if (authState.isAuthenticated) {
        return <Navigate to='/discovery' />
    } else {
        console.log(authState);
    }

    return (
        <div className='authDisplay'>
            <div className='authContainer'>
                <div>
                    <Form className='authForm' onSubmit={login}>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangeLoginForm} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangeLoginForm} />
                        </Form.Group>

                        <Button variant='success' type='submit' >Login</Button>
                    </Form>

                    {alertLoginFailed}

                    <p>Don't have an account?
                        <Link to='/register'>
                            <Button variant='info' size='sm' className='ml-2' >Register</Button>
                        </Link>
                    </p>

                    <div className='auth-img'>
                        <img src={authImg} alt='sound-clone logo' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginForm
