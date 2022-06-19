import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <h1 class='heading clip image'>The NewsBingo</h1>
      <div class='home_content'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos sapiente
          officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum.
          Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
          cumque velit .
        </p>
      </div>

      <div class='register_login'>
        <p>
          Are you a New User? <Link to='/register'>Register</Link>
        </p>
        <p>
          Are you a Registered User? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
