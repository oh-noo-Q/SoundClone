import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';

const ProtectedRoute = ({ Component }) => {
  const { authState } = useContext(AuthContext);

  if (authState.authLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <>{authState.isAuthenticated ? <Component /> : <Navigate to="/login" />}</>
  );
};

export default ProtectedRoute;
