//SearchBar: input text

export default function SearchBar(props){
	return (
		<div>
			<input type="text" placeholder="Search"
				onChange={event => {props.setSearchIn(event.target.value)}}
			/>
		</div>
	);
}
