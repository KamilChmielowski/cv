describe('Projects Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://world-clock.p.rapidapi.com/json/utc/now', { statusCode: 200, fixture: 'now.json' })
      .as('GET_now');
    cy.intercept('GET', 'https://api.github.com/repos/KamilChmielowski/*', { statusCode: 200, fixture: 'languages.json' })
      .as('GET_languages');
    cy.visit('/projects');
  });

  it('should display projects in two languages', () => {

  });
})
