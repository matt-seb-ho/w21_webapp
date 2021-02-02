import React from 'react'
import { TextInput } from 'react-materialize';

export default function SignUp(){
	return (
		<div>
			<div className="outerBox">
				<TextInput label="First Name" />
				<TextInput label="Last Name" />
				<TextInput label="Email Address" />
				<TextInput label="Password" />
			</div>
		</div>
	);
}
