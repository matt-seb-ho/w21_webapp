//SearchBar: input text

export default function SearchBar(props){
	return (
		<div className="searchstack">
			<input type="text" placeholder="Name" className="nameBar"
				onChange={event => {props.setSearchIn(event.target.value)}}
				style={{flexGrow:1}}
			/>
			<input type="text" placeholder="Tags" className="tagBar"
				onChange={event => {props.setTagsIn(event.target.value)}}
			/>
		</div>
	);
}
