/* global describe it cy expect after before*/

const API_PHONES_PATH = '/phones';

const NON_EXISTING_ID = '99999';

let NEW_ONE_INTRODUCED = {};
describe('phones API test - DELETE method', () => {
	before(async () => {
		const response = await cy.request({ method: 'POST', url: `${API_PHONES_PATH}`, body: { name: 'DELETE_TEST' } });
		NEW_ONE_INTRODUCED = response.body;
	});

	it('DELETE a phone ', () => {
		cy.request('DELETE', `${API_PHONES_PATH}/${NEW_ONE_INTRODUCED.id}`).then((response) => {
			expect(response.status).equal(200);
		});
	});
	it('DELETE without phone id (endpoint does not exist)', () => {
		cy.request({ method: 'DELETE', url: API_PHONES_PATH, failOnStatusCode: false }).then((response) => {
			expect(response.status).equal(404);
		});
	});
	it('DELETE a phone with an unexisting ID  ', () => {
		cy.request({
			method: 'DELETE',
			url: `${API_PHONES_PATH}/${NON_EXISTING_ID}`,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(404);
		});
	});
});
