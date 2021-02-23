import React from 'react';
import Profile from './Profile';
import { Box, Button, Paper, Snackbar } from '@material-ui/core';

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

function StartPage(){
	return (
		<Paper className="profile" style={{backgroundColor: "#1c1e1f"}}>
			<Paper className="profileHead" style={{backgroundColor: "#ff4081"}}>
				<div style={{
					marginLeft: 10,
					display: "flex",
					alignItems: "center",
				}}>
				<h1>Hey! Welcome to FFFF!</h1>
				</div>
			</Paper>
			<Spacer height="3%" />
			<Paper variant="outlined" style={{backgroundColor: "#1c1e1f", padding: 18}}>
				<h3>About</h3>
				<p>
Zoom school is what scientists call the Big Sad (citation needed). I was thinking that it would be less sad if I made more friends, but then I remembered that I suck at making friends. So I decided to make a web app.<br /><br /> I thought it's probably easier to make friends with people with similar interests, so FFFF is my attempt to make that as easy as possible.
				</p>
				
			</Paper>
			<Spacer height="3%" />
			<Paper variant="outlined" style={{backgroundColor: "#1c1e1f", padding: 18}}>
				<h3>How to navigate this website</h3>
				<ul>
					<li>Click on people's names on the right side to see their profile</li>
					<li>Search people by name or tag with the search bar up top</li>
					<li>Search for multiple tags with a comma separated list</li>
					<li>Sign in or sign up with the button in the top right corner</li>
					<li>Edit your profile by clicking "My Profile" on the left sidebar</li>
				</ul>
			</Paper>
		</Paper>
	)
}


function Faq(){
	return (
		<Paper className="profile" style={{backgroundColor: "#1c1e1f"}}>
			<Paper className="profileHead" style={{backgroundColor: "#ff4081"}}>
				<div style={{
					marginLeft: 10,
					display: "flex",
					alignItems: "center",
				}}>
				<h1>FFFF?</h1>
				</div>
			</Paper>
			<Spacer height="3%" />
			<Paper variant="outlined" style={{backgroundColor: "#1c1e1f", padding: 18}}>
				<h3>Why's it called FFFF?</h3>				
				<p>
Mostly because I'm really bad at naming things. When I first thought of the idea, my working name name was "Friend Finder." Not only is that dumb, but I'm pretty sure "FF" is short for "fanfiction." I couldn't think of anything better, so I ultimately just decided to double down on the stupid part so at least it's funny. FFFF stands for "Friend Finder: Find Friends."
				</p>
			</Paper>
		</Paper>
	)
}

export default function ProfWrapper(props){
	let person = props.person;
	return ( <div>
		{ person.special === undefined ?
			<Profile person={props.person}/>
		:
			<div>
			{props.person.special === "start"?
				<StartPage />
			:
				<Faq />
			}
			</div>
		}
		</div>
	)
}
