import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box, Button, Paper } from '@material-ui/core';
import SearchBar from './components/SearchBar.js';
import MockData from './MOCK_DATA-3.json';
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
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase';
import PeopleList, {SimpleList} from './components/PeopleList';
import Profile from './components/Profile';

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
	primary: blue,
  },
});

		

function App() {
	const [searchIn, setSearchIn] = useState('');
	const [tagsIn, setTagsIn] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [name, setName] = useState();
	const [showSI, setShowSI] = useState(false);
	const [currentProf, setCurrentProf] = useState(dummy);
	const { currentUser } = useAuth()

	auth.onAuthStateChanged(function(user) {
	  if (user) {
    		// User is signed in.
		console.log("signed in");
		setLoggedIn(true);
	  } else {
	    // No user is signed in.
		console.log("signed out");
		setLoggedIn(false);
  	  }
	});
  	const handleSIopen = () => {
   		setShowSI(true);
  	};

	const handleSIclose = () => {
    		setShowSI(false);
  	};

	return (
		<ThemeProvider theme={darkTheme}>
		<div className="App"> 
			<div id="AppHead" className="sticky" >
				<Spacer width={100} />
				<h1>FFFF</h1>
				<Spacer width={100} />
				<div className="input-container">
					<SearchBar 
						setSearchIn={setSearchIn} 
						setTagsIn={setTagsIn}
					/>
				</div>
				<div>
					{loggedIn ?
					<Button variant="outlined" color="secondary" onClick={
						() => {auth.signOut()}
					}>
	  					Sign Out 
					</Button> : 
					<Button variant="outlined" color="primary" onClick={handleSIopen}>
	  					Sign In
					</Button>
					}
				</div>
				<Spacer width={50} />
				
			</div>
			
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
			<Profile person={currentProf}/>
			{/*
			<Paper className="profile">
				<div style={{display: "flex", alignItems: "flex-end"}}>
				<img src={dummyPfp} height="15%" width="15%" />
				<Spacer width="10%" />
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
			*/}
			<PeopleList 
				searchIn={searchIn} 
				setCurrentProf={setCurrentProf}
				tagsStr={tagsIn}
			/>
			</div>

		</div>
		</ThemeProvider>
	);
}

export default App;
