import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = "15%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
//    padding: theme.spacing(3),
  },
  myprof: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function SideBar(props){
	const classes = useStyles();

	return ( <div>
			<Drawer
				variant="permanent"
				anchor="left"
				elevation={0}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div style={{height: props.headerHeight}}></div>
				<List>
					<Divider />
					<ListItem button onClick={props.setMyProf}>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary="My Profile" />
					</ListItem>
					<Divider />
					<ListItem inset={true} button onClick={props.setStart}>
						<ListItemText primary="Start Page" />
					</ListItem>
					<Divider />
					<ListItem inset={true} button onClick={props.setFAQ}>
						<ListItemText primary="FFFF?" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText primary="Current Tags:" />
					</ListItem>
					
					{ props.tagStr.split(',').map(item => {
						return (
							<ListItem>
								<ListItemText primary={item.trim()} inset={true} />
								<IconButton edge="end" >
									<CloseIcon />
								</IconButton>
							</ListItem>
						)})
					}
				</List>
			</Drawer>
		</div>
	);
}
