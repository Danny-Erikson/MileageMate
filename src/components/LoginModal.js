import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ isOpen, onLogin, error: loginError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password }); // Let App handle success/failure
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input type="checkbox" name="userType" value="demoViewer" />
            Continue as Demo Viewer
          </label>
          <button type="submit">Login</button>
        </form>
        {loginError && <p className="login-error">{loginError}</p>}
      </div>
    </div>
  );
}

export default LoginModal;
