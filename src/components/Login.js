 
import React, { useState } from 'react'

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

//const clientId = '528798288833-6jp9ee02c0otfb0hl3atolk4eff6pibq.apps.googleusercontent.com' //insert client id here

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login(props) {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully! Welcome ${res.profileObj.name}! \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    props.setLoggedIn(true);
    props.setName(res.profileObj.name)
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. Please try again`
    );
  };

  
  return (

    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
