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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import SignUp from './SignUp';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

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
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [SUopen, setSUopen] = useState(false);

  const handleSUopen = () => {
  	setSUopen(true);
  };
  const handleSUclose = () => {
  	setSUopen(false);
  };

  async function handleSubmit(e){
  	e.preventDefault()

	try {
		setError('');
		setLoading(true);
		console.log(emailRef.current.value);
		await login(emailRef.current.value, passwordRef.current.value);	
		setSUopen(false);
	} catch {
		setError('Sign In Failed');
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
          Sign in
        </Typography>
	{error && <p style={{color: "red"}}>{error}</p>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
	    inputRef={emailRef}
            autoFocus
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
            autoComplete="current-password"
	    inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2"
	      	onClick={handleSUopen}
	      >
                {"Don't have an account? Sign Up"}
              </Link>
	      <Dialog open={SUopen} onClose={handleSUclose}>
	      	<DialogTitle id="signUp">Sign Up</DialogTitle>
		<DialogContent>
		  <SignUp />
		</DialogContent>
	      </Dialog>

            </Grid>
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
