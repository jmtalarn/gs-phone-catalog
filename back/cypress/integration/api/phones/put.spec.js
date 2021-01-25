/* global describe it cy expect after before*/

//www.mariedrake.com/post/api-testing-with-cypress
const API_PHONES_PATH = '/phones';

const EXISTING_ID = '0';
const NON_EXISTING_ID = '99999';

let BEFORE_UPDATES_EXISTING_PHONE_DATA = {};
describe('phones API test - PUT method', () => {
	before(async () => {
		const response = await cy.request('GET', `${API_PHONES_PATH}/${EXISTING_ID}`);
		BEFORE_UPDATES_EXISTING_PHONE_DATA = response.body;
	});

	after(() => {
		cy.request('PUT', `${API_PHONES_PATH}/${EXISTING_ID}`, BEFORE_UPDATES_EXISTING_PHONE_DATA);
	});

	it('PUT on an existing phone ', () => {
		cy.request('PUT', `${API_PHONES_PATH}/${EXISTING_ID}`, { id: EXISTING_ID, name: 'TEST' }).then((response) => {
			expect(response.status).equal(200);
			expect(Object.keys(response.body)).to.have.lengthOf(2);
			expect(response.body.name).to.be.equal('TEST');
		});
	});
	it('PUT without phone id ', () => {
		cy.request({
			method: 'PUT',
			url: API_PHONES_PATH,
			body: { id: NON_EXISTING_ID, name: 'TEST' },
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(404);
		});
	});
	it('PUT with an NON existing phone id ', () => {
		cy.request({
			method: 'PUT',
			url: `${API_PHONES_PATH}/${NON_EXISTING_ID}`,
			body: { id: NON_EXISTING_ID, name: 'TEST' },
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(404);
		});
	});
});
