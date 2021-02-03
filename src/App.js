import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box, Button, Paper } from '@material-ui/core';
import SearchBar from './components/SearchBar.js';
import MockData from './MOCK_DATA.json';
import Login from './components/Login';
import Logout from './components/Logout';
import dummyPfp from './dummy_pfp.jpg';
import { userRef } from './firebase';
import signUp from './api/signUp';
import signIn from './api/signIn';
import { dummy } from "./dummyPerson";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
	primary: blue,
  },
});

function custFilter(arr, filters){
	return arr.filter(item => {
		for(const criteria in filters){
			if(item[criteria] === undefined || item[criteria] !== filters[criteria]){
				return false;
			}
		}
		return true;
	});
}
		

function App() {
	const [searchIn, setSearchIn] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [name, setName] = useState();
	const [showSI, setShowSI] = useState(false);

  	const handleSIopen = () => {
   		setShowSI(true);
  	};

	const handleSIclose = () => {
    		setShowSI(false);
  	};

	return (
		<AuthProvider>
		<ThemeProvider theme={darkTheme}>
		<div className="App"> 
			<div id="AppHead" className="sticky" >
				<Spacer width={100} />
				<h1>FFFF</h1>
				<Spacer width={100} />
				<div className="input-container">
					<SearchBar setSearchIn={setSearchIn} />
				</div>
				<div>
					<Button variant="outlined" color="primary" onClick={handleSIopen}>
	  					Sign In
					</Button>
					{/*
					<Button onClick={()=>onSignUp()}>Sign Up</Button>
					<button onClick={()=>onSignUp()}>Sign Up</button>
					{loggedIn ? 
					<Logout 
						className="OAuthStuff"
						loggedIn={loggedIn} 
						setLoggedIn = {(bool) => setLoggedIn(bool)}
					/> :
					<Login 
						className="OAuthStuff"
						loggedIn={loggedIn} 
						setLoggedIn = {(bool) => setLoggedIn(bool)} 
						setName={(name) => setName(name)}
					/>
					}
					*/}
				</div>
				<Spacer width={50} />
				
			</div>
			{/*
			{showLogin?
				<SignIn /> :
				null
			}
			<Modal isOpen={showLogin}>
				<SignIn />
			</Modal>
			*/}
			
			<Dialog open={showSI} onClose={handleSIclose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">SignIn</DialogTitle>
				<DialogContent>
					<SignIn />
				</DialogContent>
				<DialogActions>
				</DialogActions>
			</Dialog>

			<Spacer height={"5em"} />

			<div>
			<Paper className="profile">
				<div style={{display: "flex", alignItems: "flex-end"}}>
				{/*
				<img src={dummyPfp} height="15%" width="15%" />
				<Spacer width="10%" />
				*/}
				<h1 style={{marginBottom: 0, paddingBottom: 0}}>{dummy.firstName} {dummy.lastName}</h1>
				
				</div>
				<Spacer height="3%" />
				<p>{dummy.bio}</p>
				<Spacer height="5%"/>
				<h2 style={{marginBottom: 0, paddingBottom: 0}}>Tags</h2>
				<ul>
					<li>Video Games</li>
					<li>Anime</li>
					<li>Piano</li>
					{dummy.tags.map((item) => {
							return <li>{item}</li>
						})
					}
				</ul>
			</Paper>
			{MockData.filter((item) => {
				return (searchIn === "" ||
					item.first_name.toLowerCase().includes(searchIn.toLowerCase()));
			})
				.map((val, key) => {
					return ( <div className="user" key={key} >
						<p>{val.first_name} {val.last_name[0]}.</p>
					</div> );
			})}
			</div>

		</div>
		</ThemeProvider>
		</AuthProvider>
	);
}

/*
starter code for create-react-app:

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
	  <br />
	  testing 1 2 3
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
