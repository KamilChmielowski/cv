describe('Projects Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://world-clock.p.rapidapi.com/json/utc/now', { statusCode: 200, fixture: 'now.json' })
      .as('GET_now');
    cy.intercept('GET', 'https://api.github.com/repos/KamilChmielowski/*/languages', { statusCode: 200, fixture: 'languages.json' })
      .as('GET_languages');
    cy.visit('/projects');
  });

  it('should display min 4 projects', () => {
    const desc = cy.get('app-project-item .desc');

    desc.should(array => expect(array.length).greaterThan(3))
  });

  it('should display projects in two languages', () => {
    const desc = cy.get('app-project-item .desc');

    const descEn: string[] = [];

    cy.get('app-change-lang > .en').click().then(() => {
      cy.wait(1000);
      desc.each(el => descEn.push(el.text()));

      cy.get('app-change-lang > .pl').click().then(() => {
        cy.wait(1000);
        desc.each((pl, i) => expect(pl.text()).not.equal(descEn[i]));
      });
    });
  });

  it('should has valid github links', () => {
    cy.get(`svg-icon[name="github"]`).each(svgEl => {
      const aEl = svgEl.parent().get(0);
      expect(aEl).attr('href').to.contains(Cypress.env('githubUrl'));
    })
  });

  const checkProjectAngularVersion = (cb: (feature: HTMLElement) => any) => {
    const items = cy.get(`app-item-chips`);
    const features = cy.get(`app-features`);

    items.each((item, i) => {
      const chips = item.get(0).querySelectorAll(`[data-cy="cy-item-chip"]`);
      chips.forEach(chip => {
        if (chip.textContent?.toLowerCase().includes('angular')) {
          features.should(feature => {
            cb(feature.get(i));
          });
        }
      });
    });
  }

  it('should display Angular version of projects', () => {
    checkProjectAngularVersion(feature => {
      expect(feature.textContent).match(/[A,a]ngular \d{2}/);
    });
  });

  it('should keep angular version of projects to latest', () => {
    const allowedDiff = 4;

    cy.request({
      method: 'GET',
      url: 'https://api.github.com/repos/angular/angular/releases/latest',
    }).then(res => {
      const majorVersion = res.body?.tag_name.split('.').shift();

      checkProjectAngularVersion(feature => {
        const projectVersion = +(feature.textContent?.match(/[A,a]ngular \d{2}/)?.at(0)?.split(' ').at(1) || 0);

        expect(projectVersion).to.be.greaterThan(majorVersion - allowedDiff - 1);
      });
    });
  });
})
