import React, { useEffect, useContext } from 'react';
import { Header, Content, Footer, Grid, Loader, ErrorMessage } from './components';
import ApiContext, { ApiProvider } from './actions/api-context';

function AppWrapped() {
	return (
		<ApiProvider>
			<App />
		</ApiProvider>
	);
}

function App() {
	const { phones, loadPhones } = useContext(ApiContext);

	useEffect(() => {
		loadPhones();
	}, []);

	return (
		<main style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh' }}>
			<ErrorMessage />
			<Header />

			<Content>
				{phones.length > 0 && <Grid items={phones} />}
				{phones.length === 0 && <Loader show />}
			</Content>
			<Footer />

			<Loader />
		</main>
	);
}

export default AppWrapped;
