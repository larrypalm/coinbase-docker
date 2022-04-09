import logo from './logo.svg';
import './App.css';
import { getAllUsers, getCallback, getSecrets } from './routes'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buildQueryString } from 'utils';
import getQueryParams from 'utils/getQueryParams';


const App = () => {
	const location = useLocation();
	const [randomString, setRandomString] = useState('');
	const [secrets, setSecrets] = useState({
		secret: '',
		client_id: '',
		redirect_uri: '',
		coinbase_url: '',
	});
	
	interface Secrets {
		secret: string,
		client_id: string,
		redirect_uri: string,
		coinbase_url: string,
	}

	const generateCoinbaseUrl = (secrets: Secrets) => {
		const string = `${secrets.coinbase_url}?response_type=code&client_id=${secrets.client_id}&redirect_uri=${secrets.redirect_uri}&state=${secrets.secret}&scope=wallet:user:read,wallet:user:email,wallet:accounts:read,wallet:transactions:read&account=all`;

		return string;
	}

	// 1
	useEffect(() => {
		async function handleSecret() {
			const response = await getSecrets();
			setSecrets({ ...response });
		}

		handleSecret();
	}, []);

	// 2
	useEffect(() => {
		// setRandomString(generateCoinbaseUrl());
		setRandomString(generateCoinbaseUrl(secrets));
	}, [secrets.secret]);

	useEffect(() => {
		async function handleCallback() {
			const params: any = getQueryParams(location);

			if (params['code'] && params['state']) {
				const response = await getCallback({code: params['code'], secret: params['state'] });
				console.log('response',response)
			}
		}

		if (location.pathname === '/callback') {
			handleCallback();
		}
	}, [location.pathname]);

  	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button
					onClick={() => {
						getAllUsers().then(data => console.log(data));
					}}
				>
					HEJSNA
				</button>
				{secrets.secret && (
					<a 
						href={randomString}
					>
						Connect to Coinbase
					</a>
				)}
			</header>
		</div>
  	);
}

export default App;
