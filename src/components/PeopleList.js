import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MockData from '../MOCK_DATA-2.json';
import getStarterTags from '../mockTags'; 
import { userRef, database } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {

    width: '20%',
    float: 'right'
    //width: '100%',
    //maxWidth: 360,
    //backgroundColor: theme.palette.background.paper,
  },
}));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function tagFilter(arr, tagsStr){
	//takes a list of tags
	if(tagsStr === ""){
		return arr;
	}
	let tags = tagsStr.split(',');
	let filters = tags.map(item => item.trim()); 
	return ( arr.filter((item) => {
		for(let i = 0; i < filters.length; i++){	
			if(filters[i] !== ""){
					if(item["tags"].includes(filters[i]) === false){
						return false;
					}
			}
		}
		return true;
	}
	));
	//return filtered;
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>
    </div>
  );
}

export default function PeopleList(props){
	const classes = useStyles();
	const [people, setPeople] = useState([]);

	useEffect(() => {
		//console.log(userRef);
		userRef.on("value", (snapshot) => {
			let ppl = [];
			snapshot.forEach(data => {
				let dummyPerson = {
					firstName: data.val().firstName,
					lastName: data.val().lastName,
					bio: ("bio" in data.val())? data.val().bio : "",
					contactInfo: ("contactInfo" in data.val())? data.val().contactInfo : [],
					tags: ("tags" in data.val())? data.val().tags : [],
				}
				ppl.push(dummyPerson);
			})
			setPeople(ppl);
		})
	}, [])
	
	let starterTags = getStarterTags();

	for(let i = 0; i < MockData.length; i++){
			//pre-processing for mock data
			if(MockData[i]["firstName"] === undefined){
				MockData[i]["firstName"] = MockData[i]["first_name"];
				MockData[i]["lastName"] = MockData[i]["last_name"];
			}
			if(MockData[i]["tags"] === undefined){
					MockData[i]["tags"] = [];
					shuffleArray(starterTags);
					for(let j = 0; j < 7; j++){
						MockData[i]["tags"].push(starterTags[j]);
					}
			}

	}
	
	return (
		<div className={classes.root}>
			<List component="nav" aria-label="people">
			{tagFilter( (people.filter((item) => {
				return (props.searchIn === "" ||
					item.firstName.toLowerCase().includes(props.searchIn.toLowerCase()));
			})), props.tagsStr)
				.map((val, key) => {
					return ( 
					<ListItem button className="user" key={key} 
						onClick={() => {
							props.setCurrentProf(val);
						}}
					>
						<ListItemText primary={val.firstName + " " + val.lastName[0]}
							style={{marginLeft: '12%'}}
						/>
					</ListItem> );
			}
			)}

			</List>
		</div>
	);
}

/*	return (
		<div className={classes.root}>
			<List component="nav" aria-label="people">
			{tagFilter( (MockData.filter((item) => {
				return (props.searchIn === "" ||
					item.first_name.toLowerCase().includes(props.searchIn.toLowerCase()));
			})), props.tagsStr)
				.map((val, key) => {
					return ( 
					<ListItem button className="user" key={key} 
						onClick={() => {
							props.setCurrentProf(val);
						}}
					>
						<ListItemText primary={val.first_name + " " + val.last_name[0]}
							style={{marginLeft: '12%'}}
						/>
					</ListItem> );
			}
			)}

			</List>
		</div>
	);

*/
