import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Snackbar } from '@material-ui/core';
import { dummy } from "../dummyPerson";
import TextField from '@material-ui/core/TextField';
import { userRef } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Spacer(props) {
	return <div style={{width: props.width, height: props.height}}> </div>;
}

export default function Profile(props){
	//let person = props.person;	
	const { currentUser } = useAuth();
	const [person, setPerson] = useState(props.person);
	const [editMode, setEditMode] = useState(false);
	const [bioText, setBioText] = useState(person.bio);
	const [snackOpen, setSnackOpen] = useState(false);
	
	const snackBegone = (
		<Button color="secondary" size="small"
			onClick={() => {setSnackOpen(false)}}>
			Aight.
		</Button>
	);

	//maybe undefined
	const mundef = (arr) => {
		if (arr === undefined) {
			return [];
		}
		return arr;
	}

	const [stags, setStags] = useState(mundef(person.tags));
	const [contacts, setContacts] = useState(mundef(person.contactInfo));
	const [ctag, setCTag] = useState("");
	const [ccontact, setCContact] = useState("");
	const [profChanged, setProfChanged] = useState(false);

	useEffect(() => {
		setPerson(props.person);
		setProfChanged(true);
		console.log("props effect went off");
		console.log("props.person", props.person);
		console.log("person: ", person);
		/*
		cancelChanges();
		setBioText(person.bio);
		setStags(mundef(person.tags));
		setContacts(person.contacts);
		*/
	}, [props.person]);

	useEffect(() => {
		cancelChanges();
		setBioText(person.bio);
		setStags(mundef(person.tags));
		setContacts(mundef(person.contactInfo));
		console.log("profChanged effect went off");
		console.log("props.person", props.person);
		console.log("person: ", person);
		setProfChanged(false);
	}, [profChanged]);
	
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
			let updatedStags = [...stags];
			updatedStags.push(ctag);
			setStags(updatedStags);
		}
	}

	const addCon = () => {
		if(ccontact !== ""){
			let updatedContacts = [...contacts];
			updatedContacts.push(ccontact);
			setContacts(updatedContacts);
		}
	}

	const cancelChanges = () => {
		setStags(person.tags);
		setContacts(person.contactInfo);
		setEditMode(false);
	}

	const updateProfile = () => {
		userRef.child(currentUser.uid).set({
			firstName: person.firstName,
			lastName: person.lastName,
			email: person.email,
			contactInfo: contacts,
			//contactInfo: person.contactInfo == undefined? []: person.contactInfo,
			tags: stags,
			bio: bioText,
		});
		setPerson({
			firstName: person.firstName,
			lastName: person.lastName,
			email: person.email,
			//contactInfo: person.contactInfo == undefined? []: person.contactInfo,
			contactInfo: contacts,
			tags: stags,
			bio: bioText,
		});
		setSnackOpen(true);
		//console.log("profile updated");
	}

	const handleRemoveTag = (tag) => {
		setStags(stags.filter(item => item !== tag));
	}

	const handleRemoveCon = (con) => {
		setContacts(contacts.filter(item => item !== con));
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
					<Button variant="outlined" color="primary" onClick={() => {
						setEditMode(true);
					}}
						style={{flexGrow: 0}}
					>
						Edit
					</Button>
					</div> )
				:
					( <div style={{display: "flex"}} >
					<Button variant="outlined" color="secondary" onClick={cancelChanges}>
						Cancel
					</Button>
					<Spacer width={10} />
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
					label="Contact Info"
					onChange={handleCContactChange}
					size="small"
					fullWidth
					style={{height: "75%"}}
				
				/>
				<Spacer width={50} />
				<Button variant="contained" color="secondary" onClick={addCon}
					style={{height: "20%"}}
					endIcon={<AddIcon />}>
					Add
				</Button>
			</div>
				<List>
					{ contacts.map(item => {
						return ( <ListItem>
							<ListItemText primary={item} />
							<IconButton edge="end" onClick={() => {
								handleRemoveCon(item);
							}}>
								<CloseIcon />
							</IconButton>
						</ListItem> )
					})}
				</List>
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
				<List>
					{ stags.map(item => {
						return ( <ListItem>
							<ListItemText primary={item} />
							<IconButton edge="end" onClick={() => {
								handleRemoveTag(item);
							}}>
								<CloseIcon />
							</IconButton>
						</ListItem> )
					})}
				</List>
			</div>

			:

			//viewing mode
			<div>
			<h3 style={{marginBottom: 0, paddingBottom: 0}}>Bio</h3>
			<p>{person.bio}</p>
			<Spacer height="5%"/>
			<h3 style={{marginBottom: 10, paddingBottom: 0}}>Contact Info</h3>
			<ul style={{listStyle: "none", paddingTop: 0, marginTop: 0}}>
				{person.contactInfo != null && person.contactInfo.map((item) => {
						return <li>{item}</li>
					})
				}
			</ul>
			<h3 style={{marginBottom: 0, paddingBottom: 0}}>Tags</h3>
			<ul style={{paddingTop: 10, marginTop: 0}}>
				{person.tags != null && person.tags.map((item) => {
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
				action={snackBegone}
			/>
		</Paper>
	);
}
