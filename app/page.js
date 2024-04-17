import React from 'react';
import NavBar from './Cannabuis/Components/navBar';

const HomePage = () => {
  return (
    <main>
      <NavBar/>
      <div>
        <h1>Welcome to the Cannabuis</h1>
        <p>Please login to continue:</p>
        <a href="/Cannabuis">Login</a>
      </div>
    </main>
  );
};

export default HomePage;
