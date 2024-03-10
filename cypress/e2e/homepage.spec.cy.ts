describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://world-clock.p.rapidapi.com/json/utc/now', { statusCode: 200, fixture: 'now.json' })
      .as('GET_now');
    cy.visit('/');
  });

  it('should display cv in two languages', () => {
    const titles = cy.get('app-section-title > .title > .value');
    const desc = cy.getCy('about-me-desc');

    const titlesEn: string[] = [];
    let descEn: string = '';

    cy.get('app-change-lang > .en').click().then(() => {
      cy.wait(1000);
      titles.each(el => titlesEn.push(el.text()));
      desc.should(el => descEn = el.text());

      cy.get('app-change-lang > .pl').click().then(() => {
        cy.wait(1000);
        titles.each((titlePl, i) => expect(titlePl.text()).not.equal(titlesEn[i]));
        desc.should(value => expect(value.text()).not.equal(descEn));
      });
    });
  });

  it('should display my personal contact info', () => {
    const checkContactInfo = () => {
      cy.get('app-header h1').should(el => {
        expect(el.text()).to.equal('Kamil Chmielowski')
      });
      cy.get('app-header h2').contains('Web').contains('Angular');
      cy.get('app-header h3').contains('PL').contains('Gliwice')
      cy.getCy('header-tel', '.copy > .text').should(v => {
        expect(v.text().split(' ').join('')).to.contains('459413344')
      });
      cy.getCy('header-email', '.copy > .text').should(el => {
        expect(el.text()).to.equal('kamilchmielowski94@gmail.com')
      });
    }

    checkContactInfo();
    cy.get('app-change-lang > .pl').click();
    checkContactInfo();
    cy.get('app-change-lang > .en').click();
    checkContactInfo();
  });

  it('should display actual years of experience', () => {
    cy.wait('@GET_now').then(res=> {
      cy.getCy('about-me-desc').should(desc => {
        const firstNumber = +desc.text().replace( /(^.+\D)(\d+)(\D.+$)/i,'$2');
        const yearsOfExperience = new Date(res.response?.body.currentDateTime).getFullYear() - 1 - 2017;

        expect(firstNumber).greaterThan(yearsOfExperience - 1);
      });
    })
  });

  it('should display min two links in description', () => {
    cy.getCy('about-me-desc').should(desc => {
      const linksCount = desc.get(0).innerHTML.match(/href="https:/g)?.length;

      expect(linksCount).greaterThan(1);
    });
  });

  it('should switch application theme', () => {
    const switchTheme = () => cy.getCy('change-theme-btn').click();

    cy.wait(1000).then(() => {
      cy.get('body').then(el1 => {
        const defaultColor = el1.css('background-color');

        switchTheme().then(() => {
          cy.wait(1000);
          cy.get('body').then(el2 => {
            const lightColor = el2.css('background-color');

            switchTheme().then(() => {
              cy.wait(1000);
              cy.get('body').should(el3 => {
                const darkColor = el3.css('background-color');

                expect(defaultColor).to.not.equal(lightColor);
                expect(defaultColor).to.equal(darkColor);
                expect(lightColor).to.not.equal(darkColor);
              });
            });
          });
        });
      });
    })
  });

  it('should has valid github links', () => {
    cy.get(`svg-icon[name="github"]`).each(svgEl => {
      const aEl = svgEl.parent().get(0);
      expect(aEl).attr('href').to.contains(Cypress.env('githubUrl'));
    })
  });

  it('should include linkedIn link', () => {
    cy.get(`svg-icon[name="linkedin"]`).should((svgEl => {
      const aEl = svgEl.parent().get(0);

      expect(svgEl.length).to.equal(1);
      expect(aEl).attr('href').to.be.equal(Cypress.env('linkedInUrl'));
    }))
  });

  it('should display timeline in chronological order', () => {
    let prevDate: string;
    let currentDate: string;

    cy.get(`app-timeline-item`).each(timelineEl => {
      const siblings = timelineEl.siblings(`app-timeline-item`);
      if (siblings.length > 0) {
        const getDate = () => timelineEl.children('.content').children('.desc').children('.date').text();
        currentDate = getDate();

        if (currentDate && prevDate) {
          const prevRanges = prevDate.split(' ').join('').split('-');
          const currentRanges = currentDate.split(' ').join('').split('-');

          expect(+prevRanges[0]).to.be.greaterThan(+currentRanges[0]);
          expect(+prevRanges[1]).to.be.greaterThan(+currentRanges[1]);
        }
        prevDate = getDate();
      }
    })
  });

  it('should copy tel number to clipboard', () => {
    cy.getCy('header-tel', '.copy').click().then(() => {
      cy.wait(300);

      cy.window().then(win => {
        win.navigator.clipboard.readText().then(text => {
          expect(text).to.eq('48 459 413 344');
        })
      })
    });
  });

  it('should copy email to clipboard', () => {
    cy.getCy('header-email', '.copy').click().then(() => {
      cy.wait(300);

      cy.window().then(win => {
        win.navigator.clipboard.readText().then(text => {
          expect(text).to.eq('kamilchmielowski94@gmail.com');
        })
      })
    });
  });
})
