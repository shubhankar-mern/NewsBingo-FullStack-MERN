import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function postData(e) {
    e.preventDefault();

    axios
      .post(
        'http://localhost:5000/login',
        {
          email: email,

          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (res) {
        console.log('success, dictionary sent,', res);
        if (res.data.status == 'ok') {
          navigate('/profile', {
            state: {
              LoggedUserEmail: res.data.userEmail,
              LoggedUserName: res.data.userName,
              LoggedUserToken: res.data.token,
            },
          });
        } else {
          navigate('/register');
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    setEmail('');

    setPassword('');
  }
  return (
    <div>
      <div className='heading clip image'>The NewsBingo | Login</div>
      <div className='miniheading clip image'>Get news of your Interest</div>

      <div className='login-form'>
        <form onSubmit={postData}>
          <span>
            <label for='email'>Email:</label>
          </span>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <span>
            <label for='password'>Password:</label>
          </span>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <input type='submit' value='Login' />

          <br />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
