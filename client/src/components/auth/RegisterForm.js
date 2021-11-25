import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';

const RegisterForm = ({ authImg }) => {
  // context
  const { registerUser } = useContext(AuthContext);

  // router
  const navigate = useNavigate();

  // local state
  const [registerForm, setRegisterForm] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    console.log('register');
  }, []);

  // alert if login failed
  const [alertRegisterFailed, setAlertRegisterFailed] = useState(<div></div>);

  const { fullname, username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlertRegisterFailed(
        <div className="alert-login">
          Register failed: Password and confirm password are different
        </div>
      );
      setTimeout(() => setAlertRegisterFailed(<div></div>), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        setAlertRegisterFailed(<div></div>);
        navigate('/discovery');
      } else {
        setAlertRegisterFailed(
          <div className="alert-login">
            Register failed: {registerData.message}
          </div>
        );
        setTimeout(() => setAlertRegisterFailed(<div></div>), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { authState } = useContext(AuthContext);

  if (authState.authLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (authState.isAuthenticated) {
    return <Navigate to="/discovery" />;
  } else {
    console.log(authState);
  }

  return (
    <div className="authDisplay">
      <div className="authContainer">
        <div>
          <Form className="authForm" onSubmit={register}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Fullname"
                name="fullname"
                required
                value={fullname}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                required
                value={username}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={onChangeRegisterForm}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>

          {alertRegisterFailed}

          <p>
            Already have an account?
            <Link to="/login">
              <Button variant="info" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          </p>

          <div className="auth-img">
            <img src={authImg} alt="sound-clone logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
