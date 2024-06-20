import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signin-container">
      <div className="logo-container">
        <img src="/HomeFinderLogo.webp" alt="HomeFinder Logo" className="logo" />
      </div>
      <h1 className="welcome-message">Welcome to HomeFinder!</h1>
      <p className="description">
        HomeFinder is a home inventory app that helps you keep track of the locations of every important item in your house.
        Create a digital database of your items and never lose track of your valuables again!
      </p>
      <Button type="button" size="lg" className="sign-in-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
