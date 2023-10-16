import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../../firebase';
import logo from './logo.png'; // Import your logo image
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); // New state for error message
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false); // New state for password reset success
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user's email is stored in local storage
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }

    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user && loginSuccess) {
        navigate('/add');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loginSuccess, navigate]);

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with: ', user.email);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        setLoginSuccess(true);
      })
      .catch((error) => {
        console.error(error);

        // Set the error message
        setError('Incorrect email or password');
        setLoginSuccess(false);
      });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        console.log('Password reset email sent to: ', email);
        setResetPasswordSuccess(true); // Set the success state
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error(error);
        setResetPasswordSuccess(false); // Set the success state to false
        setError('Error sending password reset email'); // Set the error message
      });
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <h1>LOGIN</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember Me
        </label>

        <button type="button" className="btn" onClick={handleLogin}>
          LOGIN
        </button>

        <p>
          <a id="forgot-id" href="#" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </p>

        {/* Display the success message */}
        {resetPasswordSuccess && (
          <div className="success-message">
            Password reset email sent successfully!
          </div>
        )}
        
        {/* Display the error message */}
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="content">
        <img src={logo} alt="Logo" className="main-logo" />
      </div>
    </div>
  );
}

export default Login;
