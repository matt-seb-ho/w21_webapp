import { firebaseApp, userRef } from '../firebase';

//export default 
export default function signUp(email, password, firstName, lastName){
	if(!firstName || !lastName){
		return false;
	}
	firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.then((data) => {
			console.log("User Added to DB");
			userRef.child(data.user.uid).set({
				firstName,
				lastName,
				email
			});
			return true;
		}).catch((err) => {
			console.log(err);
			return err;
		})
}

/*
export default (email, password, firstName, lastName) => {
	if(!firstName || !lastName){
		return false;
	}
	firebaseApp.auth().createUserWithEmailAndPassword(email, password)
		.then((data) => {
			console.log("User Added to DB");
			userRef.child(data.user.uid).set({
				firstName,
				lastName,
				email
			});
			return true;
		}).catch((err) => {
			console.log(err);
			return err;
		})
};
*/
