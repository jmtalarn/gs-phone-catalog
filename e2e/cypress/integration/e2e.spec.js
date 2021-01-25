describe('E2E Test', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.intercept('GET', 'phones').as('getPhones');
	});
	it('opens the React app and it loads the data so loader should disappear', () => {
		cy.get('[data-testid=loader]').should('exist');
		cy.wait('@getPhones');
		cy.contains('Phone catalog');

		cy.get('[data-testid=loader]').should('not.exist');
		cy.get('[data-testid=grid-item]').should('exist');
		let howManyItems = 0;
		cy.get('[data-testid=grid-item]').then((items) => {
			howManyItems = items.length;
			cy.get('[data-testid=grid-item]').first().click();
			cy.contains('button', 'Edit').click();
			cy.contains('button', 'Save as new').click();
			cy.wait('@getPhones');

			cy.get('[data-testid=grid-item]').should('have.length', howManyItems + 1);
		});
	});
});
