/// <reference types="cypress" />

import type Now from '../fixtures/now.json';

interface FixtureTypes {
  now: typeof Now;
  // Add other fixtures here
}

Cypress.Commands.add('getCy', (selector: string, extra?: string) => {
  return cy.get(`[data-cy="${selector}"]${extra ? ` ${extra}` : ''}`);
})

declare global {
  namespace Cypress {
    interface Chainable {
      getCy(selector: string, extra?: string): Chainable<JQuery>;
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K,
      ): Chainable<FixtureTypes[K]>;
    }
  }
}
