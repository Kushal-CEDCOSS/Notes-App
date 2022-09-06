import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './Contexts/Main';
import './Login.css';


const Login = () => {

  const context = useContext(MyContext);

  const navigate = useNavigate();

  const validate = (e) => {
    e.preventDefault();
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    if(email.toLowerCase() !== 'kushal@gmail.com')
    {
      document.getElementById('loginEmail').focus();
      document.getElementById('emailWarn').style.display = "block";
      document.getElementById('passWarn').style.display = "none";
      return;
    }
    else if(password !== '12345')
    {
      document.getElementById('loginPassword').focus();
      document.getElementById('emailWarn').style.display = "none";
      document.getElementById('passWarn').style.display = "block";
      return;
    }
    else
    {
      document.getElementById('emailWarn').style.display = "none";
      document.getElementById('passWarn').style.display = "none";
      context.signedUser[1]('Kushal');
      navigate('/');
    }
  }
  return (
    <div className="Login" onSubmit={validate}>
      <form className="loginForm">
        <h1>Login</h1>
        <div className="block">
          <h2>E-Mail Address</h2>
          <input required type="email" id="loginEmail" placeholder='Kushal@gmail.com' />
          <sup id="emailWarn">*Please enter this valid Email address - Kushal@gmail.com</sup>
        </div>
        <div className="block">
          <h2>Password</h2>
          <input required type="password" id="loginPassword" placeholder="12345" />
          <sup id="passWarn">*Please enter this valid password - 12345</sup>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login