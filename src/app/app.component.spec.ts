import { TestBed } from '@angular/core/testing';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';

xdescribe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [
      AngularSvgIconModule.forRoot(),
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
