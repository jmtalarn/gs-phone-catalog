/* global describe it cy expect after*/

const API_PHONES_PATH = '/phones';

const EXISTING_ID = '0';

let ID_TO_DELETE = '';
describe('phones API test - POST method', () => {
	after(() => {
		cy.request('DELETE', `${API_PHONES_PATH}/${ID_TO_DELETE}`);
	});
	it('POST a new phone ', () => {
		cy.request('POST', API_PHONES_PATH, { name: 'TEST' }).then((response) => {
			expect(response.status).equal(200);
			ID_TO_DELETE = response.body.id;
		});
	});
	it('POST a phone with an existing ID  ', () => {
		cy.request({
			method: 'POST',
			url: `${API_PHONES_PATH}`,
			body: { id: EXISTING_ID, name: 'TEST' },
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(409);
		});
	});
});
