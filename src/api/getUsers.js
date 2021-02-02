import { userRef } from "../firebase";

export default function getUsers(){
	console.log("started getUsers");
	userRef.once('value', snap => {
		return snap.val();
	});
};
