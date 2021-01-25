/* global describe it cy expect*/

const API_PHONES_PATH = '/phones';

const EXISTING_ID = '0';
const NON_EXISTING_ID = '99999';

describe('phones API test - GET method', () => {
	it('GET list of all phones', () => {
		cy.request('GET', API_PHONES_PATH).then((response) => {
			expect(response.status).equal(200);
		});
	});
	it('GET a phone', () => {
		cy.request('GET', `${API_PHONES_PATH}/${EXISTING_ID}`).then((response) => {
			expect(response.status).equal(200);
		});
	});
	it('GET an unexisting phone', () => {
		cy.request({ method: 'GET', url: `${API_PHONES_PATH}/${NON_EXISTING_ID}`, failOnStatusCode: false }).then(
			(response) => {
				expect(response.status).equal(404);
			},
		);
	});
});
