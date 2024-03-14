describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://world-clock.p.rapidapi.com/json/utc/now', { statusCode: 200, fixture: 'now.json' })
      .as('GET_now');
    cy.intercept('GET', 'https://api.github.com/repos/KamilChmielowski/*/languages', { statusCode: 200, fixture: 'languages.json' })
      .as('GET_languages');
    cy.visit('/');
  });

  it('should set proper routing', () => {
    const iconsToRoutes = new Map([
      ['about', '/'],
      ['projects', '/projects'],
    ]);

    const validateRoute = (selector: string ) => {
      cy.getCy(selector).click().then(anchor => {
        cy.wait(800);
        cy.location('pathname').should('eq', iconsToRoutes.get(anchor.children().attr('name') || ''));
      });
    }

    ['nav-about', 'nav-projects'].forEach(selector => {
      validateRoute(selector);
    })
  });
})
