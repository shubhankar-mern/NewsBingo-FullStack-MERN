import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footers2 from './Footers2';
import axios from 'axios';
import Card from './Card';
import { useState, useEffect } from 'react';
import CardSkeleton from './CardSkeleton';
const Profile = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [dataBusiness, setData] = useState([]);
  const [dataHeadlines, setDataH] = useState([]);
  const [dataSports, setDataS] = useState([]);
  const [dataTechnology, setDataT] = useState([]);
  const [topicsArray, setTopicsArray] = useState([]);
  console.log('Email :', location.state.LoggedUserEmail);
  console.log('Name :', location.state.LoggedUserName);
  console.log('Tken :', location.state.LoggedUserToken);
  const token = location.state.LoggedUserToken;
  useEffect(() => {
    axios
      .get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.topicsArray);
        setTopicsArray(res.data.topicsArray);
        if (res.data.data.hasOwnProperty('newsBusinessAPI')) {
          setData(res.data.data.newsBusinessAPI.articles);
        }
        if (res.data.data.hasOwnProperty('newsHeadlinesAPI')) {
          setDataH(res.data.data.newsHeadlinesAPI.articles);
        }
        if (res.data.data.hasOwnProperty('newsSportsAPI')) {
          setDataS(res.data.data.newsSportsAPI.articles);
        }
        if (res.data.data.hasOwnProperty('newsTechnologyAPI')) {
          setDataT(res.data.data.newsTechnologyAPI.articles);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  //handlelogout
  async function handleLogout() {
    axios
      .get('http://localhost:5000/logout', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (res) {
        console.log('success, dictionary sent,', res);
        if (res.data.status == 'ok') {
          navigate('/');
        } else {
          navigate('/register');
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div>
      <div className='heading clip image'>The NewsBingo | Profile</div>
      <div className='miniheading clip image'>Get news of your Interest</div>
      {/* NavBar */}
      <div className='options'>
        <span>Hi, {location.state.LoggedUserName}</span>
        <span>Homepage</span>

        <span onClick={handleLogout}>Logout</span>
      </div>

      {topicsArray.includes('Business') ? (
        <>
          <div className='heading clip image'>Business</div>
          <div className='CardHolder'>
            {dataBusiness.map((bit, index) => (
              <Card props={bit} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}

      {topicsArray.includes('Headlines') ? (
        <>
          <div className='heading clip image'>Headlines</div>
          <div className='CardHolder'>
            {dataHeadlines.map((bit, index) => (
              <Card props={bit} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}

      {topicsArray.includes('Sports') ? (
        <>
          <div className='heading clip image'>Sports</div>
          <div className='CardHolder'>
            {dataSports.map((bit, index) => (
              <Card props={bit} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}

      {topicsArray.includes('Technology') ? (
        <>
          <div className='heading clip image'>Technology</div>
          <div className='CardHolder'>
            {dataTechnology.map((bit, index) => (
              <Card props={bit} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}

      <Footers2 />
    </div>
  );
};

export default Profile;
