import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footers2 from './Footers2';
import { useState, useEffect } from 'react';
import axios from 'axios';

const userData = [
  { name: 'Business' },
  { name: 'Headlines' },
  { name: 'Sports' },
  { name: 'Technology' },
];

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [subscription, setSubscription] = useState([]);
  const [subsList, setsubsList] = useState([]);

  console.log('name :', name);
  console.log('age :', age);
  console.log('email :', email);
  console.log('sex :', sex);
  console.log('password :', password);
  console.log('cpassword :', cpassword);
  console.log('subscription :', subscription);
  console.log('subsList :', subsList);

  useEffect(() => {
    setsubsList(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = subsList.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
    );
    setsubsList(tempUser);

    let chosenSubscriptions = tempUser.filter((val) => val.isChecked == true);

    console.log('subslsit :', chosenSubscriptions);
    setSubscription(chosenSubscriptions);
    console.log('sublister :', subscription);
  };

  async function postData(e) {
    e.preventDefault();

    axios
      .post('http://localhost:5000/register', {
        name: name,
        age: age,
        email: email,
        sex: sex,
        subscription: subscription,
        password: password,
        cpassword: cpassword,
      })
      .then(function (res) {
        console.log('success, dictionary sent,', res);
        if (res.data.status == 'ok') {
          navigate('/login');
        } else {
          navigate('/register');
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    setName('');
    setAge('');
    setEmail('');
    setSubscription([]);
    setPassword('');
    setCPassword('');
  }
  return (
    <div>
      <div className='heading clip image'>The NewsBingo | Register</div>
      <div className='miniheading clip image'>Get news of your Interest</div>

      {/* form starts */}
      <div class='register-form'>
        <br />
        {/* onClick={postData} */}
        <form onSubmit={postData}>
          <span>
            <label for='name'>Name:</label>
          </span>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
          />

          <span>
            <label for='age'>Age:</label>
          </span>
          <input
            type='number'
            id='age'
            name='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <span>
            <label for='email'>Email:</label>
          </span>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />

          <span>
            <label for='sex'>Sex: </label>
            <input
              type='radio'
              id='sexchoice1'
              name='sex'
              value='male'
              onClick={() => {
                setSex('male');
              }}
            />
            <label for='sexchoice1'>Male</label>

            <input
              type='radio'
              id='sexchoice12'
              name='sex'
              value='female'
              onClick={() => {
                setSex('female');
              }}
            />
            <label for='sexchoice2'>Female</label>
          </span>

          <span>
            <label for='subscription'>Subscription type:( atleast 2)</label>
            {subsList.map((user, index) => (
              <div>
                <input
                  type='checkbox'
                  name={user.name}
                  checked={user?.isChecked || false}
                  onChange={handleChange}
                />
                <label>{user.name}</label>
              </div>
            ))}
          </span>

          <span>
            <label for='password'>Password:</label>
          </span>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span>
            <label for='confirm_password'>Confirm Password:</label>
          </span>
          <input
            type='password'
            id='confirm_password'
            name='confirm_password'
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <br />

          <input type='submit' value='Register' />
        </form>
        <br />
        <br />
      </div>

      {/* form ends */}
      <br />
      <br />
      <br />
      <Footers2 />
    </div>
  );
};

export default Register;
