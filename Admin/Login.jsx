import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../../firebase';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
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

        Swal.fire({
          title: 'Logged In',
          text: 'You have successfully logged in.',
          icon: 'success',
        });

        setLoginSuccess(true);
      })
      .catch((error) => {
        console.error(error);

        setError('Incorrect email or password');
        setLoginSuccess(false);

        Swal.fire({
          title: 'Login Failed',
          text: 'Incorrect email or password. Please try again.',
          icon: 'error',
        });
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // Call handleLogin when Enter is pressed
    }
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
      <div className="content">
        <img src={logo} alt="Logo" className="main-logo" />
      </div>
        <h1>LOGIN</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyPress={handleKeyPress} 
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
            onKeyPress={handleKeyPress} 
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

        {resetPasswordSuccess && (
          <div className="success-message">
            Password reset email sent successfully!
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>

      
    </div>
  );
}

export default Login;
