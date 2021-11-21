import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const RegisterForm = ({ authImg }) => {
    return (
        <div className='authDisplay'>
            <div className='authContainer'>
                <div>
                    <Form className='authForm'>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Fullname' name='fullname' required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type='text' placeholder='Username' name='username' required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type='password' placeholder='Password' name='password' required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type='password' placeholder='Confirm password' name='confirmPassword' required />
                        </Form.Group>

                        <Button variant='success' type='submit' >Login</Button>
                    </Form>

                    <p>Already have an account?
                        <Link to='/login'>
                            <Button variant='info' size='sm' className='ml-2' >Login</Button>
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

export default RegisterForm
