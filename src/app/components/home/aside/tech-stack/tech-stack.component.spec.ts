import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackComponent } from './tech-stack.component';

describe('TechStackComponent', () => {
  let component: TechStackComponent;
  let fixture: ComponentFixture<TechStackComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render min 5 tech bars', () => {
    const progressBarsEl = fixture.debugElement.queryAll(By.css('app-progress-bar'))

    expect(progressBarsEl.length).toBeGreaterThanOrEqual(5);
  });

  it('should pass content to app-progress-bar components', () => {
    const elements = fixture.debugElement.queryAll(By.css('app-progress-bar'));

    elements.forEach(element => expect(element.nativeElement.textContent).toBeTruthy());
  });
});
