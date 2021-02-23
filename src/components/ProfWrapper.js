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
			<Paper variant="outlined" style={{backgroundColor: "#1c1e1f"}}>
				<p style={{margin: 18}}>
					testing123
				</p>
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
				<h1>Hey! Welcome to FFFF!</h1>
				</div>
			</Paper>
			<Spacer height="3%" />
			<Paper variant="outlined" style={{backgroundColor: "#1c1e1f"}}>
				<p style={{margin: 18}}>
					testing123456
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
