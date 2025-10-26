describe('Sign In Flow', () => {
  it('should render sign in page and allow login', () => {
    cy.visit('/signin');
    cy.get('input[placeholder="Email"]').type('admin@example.com');
    cy.get('input[placeholder="Password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
    cy.contains('Admin Dashboard').should('be.visible');
  });
});
