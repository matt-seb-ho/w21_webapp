import React from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { dummy } from "../dummyPerson";

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

export default function Profile(props){
	const person = props.person;
	return (
			<Paper className="profile">
				<div style={{display: "flex", alignItems: "flex-end"}}>
				{/*
				<img src={dummyPfp} height="15%" width="15%" />
				<Spacer width="10%" />
				*/}
				<h1 style={{marginBottom: 0, paddingBottom: 0}}>{person.firstName} {person.lastName}</h1>
				
				</div>
				<Spacer height="3%" />
				<p>{person.bio}</p>
				<Spacer height="5%"/>
				<h2 style={{marginBottom: 0, paddingBottom: 0}}>Tags</h2>
				<ul>
					{ person.tags.map((item) => {
							return <li>{item}</li>
						})
					}
				</ul>
			</Paper>
	);
}
