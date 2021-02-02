import { firebaseApp, userRef } from '../firebase';


export default function signIn(email, password){
	console.log("stared sign in");
	firebaseApp.auth().signInWithEmailAndPassword(email, password)
		.then((data) => {
			userRef.child(data.user.uid).once("value", (snapshot) => {
				console.log(snapshot.val());
				return snapshot.val();
			});
		}).catch((err) => {
			console.log(err.message);
			console.log("User Not Found and not Signed In");
			return err;
		})
};

