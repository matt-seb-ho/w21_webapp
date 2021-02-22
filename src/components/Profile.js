import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Snackbar } from '@material-ui/core';
import { dummy } from "../dummyPerson";
import TextField from '@material-ui/core/TextField';
import { userRef } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

export default function Profile(props){
	//let person = props.person;	
	const [person, setPerson] = useState(props.person);
	const [editMode, setEditMode] = useState(false);
	const [bioText, setBioText] = useState(person.bio);
	const { currentUser } = useAuth();
	const [snackOpen, setSnackOpen] = useState(false);


	//maybe undefined
	const mundef = (list) => (list == undefined? []: list);
	const [tags, setTags] = useState(mundef(person.tags));
	const [contacts, setContacts] = useState(mundef(person.contactInfo));
	const [ctag, setCTag] = useState("");
	const [ccontact, setCContact] = useState("");

	useEffect(() => {
		setPerson(props.person);
		setTags(person.tags);
		setContacts(person.contacts);
	}, [props.person]);
	
	const handleBioChange = (event) => {
		setBioText(event.target.value);
	}

	const handleCTagChange = (event) => {
		setCTag(event.target.value);
	}

	const handleCContactChange = (event) => {
		setCContact(event.target.value);
	}

	const addTag = () => {
		if(ctag !== ""){
			tags.push(ctag);
		}
	}

	const updateProfile = () => {
		userRef.child(currentUser.uid).set({
			firstName: person.firstName,
			lastName: person.lastName,
			email: person.email,
			contactInfo: person.contactInfo == undefined? []: person.contactInfo,
			tags: tags,
			bio: bioText,
		});
		setSnackOpen(true);
		//console.log("profile updated");
	}

	return (
		<Paper className="profile">
			<div style={{display: "flex", alignItems: "flex-end",}}>
			{/*
			<img src={dummyPfp} height="15%" width="15%" />
			<Spacer width="10%" />
			*/}
			
			<h1 style={{marginBottom: 0, paddingBottom: 0, flexGrow: 0}}>{person.firstName} {person.lastName}</h1>
			<div style={{flexGrow: 10}}> </div>
			{ person["editable"] != null &&
				(!editMode?
					( <div>
					<Button variant="contained" color="primary" onClick={() => {
						setEditMode(true);
					}}
						style={{flexGrow: 0}}
					>
						Edit
					</Button>
					</div> )
				:
					( <div>
					<Button variant="contained" color="secondary" onClick={() => {
						updateProfile();
						setEditMode(false);
					}}>
						Save Changes
					</Button>	
					</div> )
				)
			}

			</div>
			<Spacer height="3%" />
			{ editMode? 
			//edit mode
			<div>
			{/* <h3 style={{marginBottom: 0, paddingBottom: 0}}>Bio</h3> */}
			<TextField
				variant="filled"
				margin="normal"
				multiline
				label="Bio"
				rows={3}
				defaultValue={person.bio}
				onChange={handleBioChange}
				style={{width: "100%"}}
			/>
			<div style={{display: "flex", alignItems: "center"}}>
				<TextField
					variant="filled"
					margin="normal"
					label="Tag"
					placeHolder="Add New Tags Here"
					onChange={handleCTagChange}
					size="small"
					fullWidth
					style={{height: "75%"}}
				
				/>
				<Spacer width={50} />
				<Button variant="contained" color="secondary" onClick={addTag}
					style={{height: "20%"}}
					endIcon={<AddIcon />}>
					Add
				</Button>
			</div>
			</div>

			:

			//viewing mode
			<div>
			<h3 style={{marginBottom: 0, paddingBottom: 0}}>Bio</h3>
			<p>{bioText}</p>
			<Spacer height="5%"/>
			<h3 style={{marginBottom: 0, paddingBottom: 0}}>Tags</h3>
			<ul>
				{tags != null && tags.map((item) => {
						return <li>{item}</li>
					})
				}
			</ul>
			</div>

			}
			<Snackbar
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				message="Your changes have been saved."
				open={snackOpen}
				onClose={() => { setSnackOpen(false) }}
			/>
		</Paper>
	);
}
