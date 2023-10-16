import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Sign.css'; // Update the import to a new CSS file

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
        navigate('/'); // For example, navigate to the home page
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="school-sign-in-container"> {/* Use a unique ID */}
      <h1>Register</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="register-button" onClick={() => handleRegister()}>
        Register
      </button>
    </div>
  );
}

export default SignIn;
