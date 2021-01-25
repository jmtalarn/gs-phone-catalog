/* global describe it cy expect after before*/

//www.mariedrake.com/post/api-testing-with-cypress
const API_PHONES_PATH = '/phones';

const EXISTING_ID = '0';
const NON_EXISTING_ID = '99999';

let BEFORE_UPDATES_EXISTING_PHONE_DATA = {};
describe('phones API test - PATCH method', () => {
	before(async () => {
		const response = await cy.request('GET', `${API_PHONES_PATH}/${EXISTING_ID}`);
		BEFORE_UPDATES_EXISTING_PHONE_DATA = response.body;
	});

	after(() => {
		cy.request('PUT', `${API_PHONES_PATH}/${EXISTING_ID}`, BEFORE_UPDATES_EXISTING_PHONE_DATA);
	});

	it('PATCH on an existing phone ', () => {
		cy.request('PATCH', `${API_PHONES_PATH}/${EXISTING_ID}`, { id: EXISTING_ID, name: 'TEST' }).then((response) => {
			expect(response.status).equal(200);
			console.log(response.body);
			expect(Object.keys(response.body)).to.have.length.greaterThan(2);
			expect(response.body.name).to.be.equal('TEST');
		});
	});
	it('PATCH without phone id ', () => {
		cy.request({
			method: 'PATCH',
			url: `${API_PHONES_PATH}`,
			body: { name: 'TEST' },
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(404);
		});
	});
	it('PATCH with an NON existing phone id ', () => {
		cy.request({
			method: 'PATCH',
			url: `${API_PHONES_PATH}/${NON_EXISTING_ID}`,
			body: { id: NON_EXISTING_ID, name: 'TEST' },
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).equal(404);
		});
	});
});
