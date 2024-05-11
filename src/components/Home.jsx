import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../auth/firebase";


const Home = () => {
  const [user] = useAuthState(auth);

  console.log(user);
  return (
    <div>
      <div className="Main">
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>

        <div className="loading" data-loading-text=" Welcome to React Advance task countries App..."></div>
        
        {/* Add emojis */}
        <div>
        <span role="img" aria-label="party">🎉</span> Hello! Welcome to the React Advance task countries App
        </div>
      </div>
    </div>
  );
};

export default Home;
