import { createContext, useState } from 'react';
import ApiClient from '../utils/api-client';

const apiClient = new ApiClient('http://localhost:3000/phones');

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [phones, setPhones] = useState([]);
	const [error, setError] = useState(null);

	function dismissError() {
		setLoading(false);
		setError(null);
	}
	function loadPhones() {
		setLoading(true);
		setTimeout(() => {
			try {
				apiClient
					.get()
					.then((json) => setPhones(json))
					.then(setLoading(false))
					.catch((error) => {
						setError(error);
					});
			} catch (error) {
				setError(error);
			}
		}, 0);
	}

	function updatePhone(data) {
		setLoading(true);
		setTimeout(() => {
			try {
				apiClient
					.patch(data.id, data)
					.then(() => {
						loadPhones();
					})
					.catch((error) => {
						setError(error);
					});
			} catch (error) {
				setError(error);
			}
		}, 0);
	}
	function deletePhone(id) {
		setLoading(true);
		setTimeout(() => {
			try {
				apiClient
					.delete(id)
					.then(() => {
						loadPhones();
					})
					.catch((error) => {
						setError(error);
					});
			} catch (error) {
				setError(error);
			}
		}, 0);
	}

	function createPhone(data) {
		setLoading(true);
		setTimeout(() => {
			try {
				apiClient
					.post(data)
					.then(() => {
						loadPhones();
					})
					.catch((error) => {
						setError(error);
					});
			} catch (error) {
				setError(error);
			}
		}, 0);
	}
	return (
		<ApiContext.Provider
			value={{ loading, phones, loadPhones, updatePhone, deletePhone, createPhone, dismissError, error }}
		>
			{children}
		</ApiContext.Provider>
	);
};

export default ApiContext;
