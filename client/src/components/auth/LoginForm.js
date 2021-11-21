import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner'

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

    const { username, password } = loginForm;

    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                navigate('/discovery');
            }

        } catch (err) {
            console.log(err);
        }
    }

    const {authState: { authLoading, isAuthenticated }} = useContext(AuthContext);

    let loadingIcon = (<div></div>)

    if (authLoading) {
        loadingIcon = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if (isAuthenticated) {
        return <Navigate to='discovery' />
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

                    <p>Don't have an account?
                        <Link to='/register'>
                            <Button variant='info' size='sm' className='ml-2' >Register</Button>
                        </Link>
                    </p>

                    <div className='auth-img'>
                        <img src={authImg} alt='sound-clone logo' />
                    </div>

                    {loadingIcon}
                </div>
            </div>
        </div>
    )
}

export default LoginForm
