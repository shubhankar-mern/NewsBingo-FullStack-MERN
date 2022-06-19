const User = require('../models/userModel');
const JWT = require('jsonwebtoken');
const axios = require('axios');
//sign-up
module.exports.register = async function (req, res) {
  const { name, age, email, sex, subscription, password, cpassword } = req.body;
  if (password != cpassword) {
    return res.json({
      status: 'Error',
    });
  }
  console.log('req body :', req.body);
  console.log('type of subscription : ', typeof req.body.subscription);
  let subArr = [];
  for (let i = 0; i < subscription.length; i++) {
    subArr.push(subscription[i].name);
  }
  console.log('sublist :', typeof subArr);
  try {
    let userInfo = await User.create({
      name: name,
      age: age,
      email: email,
      sex: sex,
      password: password,
      subscriptions: subArr,
    });

    console.log('userinfo is here By Admin:', userInfo);

    return res.json({
      name: name,
      email: email,
      status: 'ok',
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      status: 'Error',
    });
  }
};

//login
module.exports.login = async function (req, res) {
  const userEmail = req.body.email;
  const userPwd = req.body.password;
  console.log(req.body);

  let userInfo = await User.findOne({ email: userEmail, password: userPwd });

  if (userInfo) {
    const token = JWT.sign(
      {
        name: userInfo.name,
        email: userInfo.email,
      },
      'secret123'
    );
    //using session
    session = req.session;
    session.userid = req.body.email;
    console.log('req.sesssion :', req.session);
    //session ends
    return res.json({
      status: 'ok',
      user: true,
      token: token,
      userName: userInfo.name,
      userEmail: userInfo.email,
    });
  } else {
    return res.json({ status: 'error', user: false });
  }
};
//profile
module.exports.profile = async function (req, res) {
  console.log('req :', res.locals.userEmail);
  const loggedUserEmail = res.locals.userEmail;
  const userData = await User.find({ email: loggedUserEmail }, 'subscriptions');
  console.log('userData :', userData[0].subscriptions);

  try {
    const data = {};
    const topicsArray = [];
    if (userData[0].subscriptions.includes('Business')) {
      const newsBusinessAPI = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ca73a18f0fee4491a7cb22b9979cb8fa'
      );
      data.newsBusinessAPI = newsBusinessAPI.data;
      topicsArray.push('Business');
    }
    if (userData[0].subscriptions.includes('Sports')) {
      const newsSportsAPI = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ca73a18f0fee4491a7cb22b9979cb8fa'
      );
      data.newsSportsAPI = newsSportsAPI.data;
      topicsArray.push('Sports');
    }
    if (userData[0].subscriptions.includes('Headlines')) {
      const newsHeadlinesAPI = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=ca73a18f0fee4491a7cb22b9979cb8fa'
      );
      data.newsHeadlinesAPI = newsHeadlinesAPI.data;
      topicsArray.push('Headlines');
    }
    if (userData[0].subscriptions.includes('Technology')) {
      const newsTechnologyAPI = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ca73a18f0fee4491a7cb22b9979cb8fa'
      );
      data.newsTechnologyAPI = newsTechnologyAPI.data;
      topicsArray.push('Technology');
    }

    console.log('data collected :', data);

    return res.json({
      data: data,
      status: 'ok',
      topicsArray: topicsArray,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 'error', user: false });
  }
};
//logout

module.exports.logout = function (req, res) {
  if (req.session) {
    res.clearCookie('crm_cookie');

    req.session.destroy();

    return res.json({ status: 'ok', user: true });
  } else {
    return res.json({ status: 'failed', user: false });
  }
};

//authorization

module.exports.authorization = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.substring(7, authHeader.length);
  console.log('token is : ', token);
  if (!token) {
    return res.json({ status: 'error', user: false });
  }
  try {
    const data = JWT.verify(token, 'secret123');
    console.log('data is here: ', data);
    res.locals.userEmail = data.email;
    return next();
  } catch (error) {
    return res.json({ status: 'error', user: false });
  }
};
