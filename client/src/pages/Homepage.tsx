import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IWebData from '../lib/WebData'

const Homepage: React.FC = () => {
	const [webs, setWebs] = useState([]);
	const [id, setID] = useState(0);
	const [inputID, setInputID] = useState('');

	
	useEffect(() => {
		axios.get('http://localhost:9000/webprivacy')
		.then(response => response.data)
		.then(data => setWebs(data))
		.catch(err => console.error(err))
	}, []);

	const generatedWebPolicy = () => {
		if(inputID !== undefined) {
			const result = parseInt(inputID) % webs.length;
			setInputID(result.toString());
		} else {
			console.log("The Input has not found.");
		}
	}

	return(
		<div>
			<h1 className="text-5xl text-teal-700 m-8">Web Policy Randommizer</h1>
			<div>
				<h3 className="text-2xl m-5">Insert your ID to generate web policy link</h3>
			</div>
			<div className="mt-16">
				<input className="w-30" type="text" placeholder="Insert ID Number here." onChange={e => setInputID(e.target.value)} />
			</div>
			<div className="m-7">
				<button className="w-20 h-10 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700" onClick={generatedWebPolicy}>Generate</button>
			</div>
			<div className="m-10 text-3xl">
				<h3 className="m-7">Congratulations! You got the</h3>
				{webs.filter((web: IWebData) => web.id === parseInt(inputID) + 1).map((web: IWebData, index: number) => {
					return(
						<div key={index} className="mt-8">
							<a href={web.url} target="_blank" rel="noreferrer">
								<h3 className="text-blue-500">{web.name}</h3>
							</a>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Homepage;