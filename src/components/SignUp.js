import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { shadows } from '@material-ui/system';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from '@material-ui/lab';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
  	e.preventDefault()
	
	try {
		setError('');
		setLoading(true);
		console.log(emailRef.current.value);
		await signup(emailRef.current.value, passwordRef.current.value);
	} catch {
		setError('Failed to create an account');
	}
	setLoading(false);
  }

  return (
    <Container className="signInBox" component="main" maxWidth="xs" boxShadow={5}>
      <CssBaseline />
      <div className={classes.paper}>
		{/*
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
		*/}
        <Typography component="h1" variant="h5">
          Sign Up 
        </Typography>
	{/* currentUser.email */}
	{error && <p style={{color:"red"}}>{error}</p>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
	  <TextField
	    variant="outlined"
	    margin="normal"
	    required
	    fullWidth
	    id="firstName"
	    label="First Name"
	    name="first"
	    inputRef={firstRef}
	    autoFocus
	  />
	  <TextField
	    variant="outlined"
	    margin="normal"
	    required
	    fullWidth
	    id="lastName"
	    label="Last Name"
	    name="last"
	    inputRef={lastRef}
	  />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
	    inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
	    inputRef={passwordRef}
          />
          <Button
            type="submit"
	    disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            submit
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

/*
export default function SignIn(){
	return (
		<div>
			<div className="outerBox">
				<TextInput label="First Name" />
			</div>
		</div>
	);
}
*/
