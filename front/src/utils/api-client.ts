function handleErrors(response) {
	if (!response.ok) {
		throw Error(`${response.status}: ${response.statusText}`);
	}
	return response;
}

class ApiClient {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	async get(id?: string) {
		const response = await fetch(`${this.url}${id ? `/${id}` : ''}`);
		const json = await handleErrors(response).json();
		return json;
	}

	async post(object: any) {
		const response = await fetch(this.url, {
			method: 'POST',
			body: JSON.stringify(object),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		});
		const json = await handleErrors(response).json();
		return json;
	}
	async patch(id: string, object: any) {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(object),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		});
		const json = await handleErrors(response).json();
		return json;
	}
	async put(id: string, object: any) {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(object),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		});
		const json = await handleErrors(response).json();
		return json;
	}
	async delete(id: string) {
		const response = await fetch(`${this.url}/${id}`, {
			method: 'DELETE',
		});
		const json = await handleErrors(response).json();
		return json;
	}
}

export default ApiClient;
