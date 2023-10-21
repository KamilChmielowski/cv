import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLangComponent } from './change-lang.component';

describe('ChangeLangComponent', () => {
  let component: ChangeLangComponent;
  let fixture: ComponentFixture<ChangeLangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeLangComponent]
    });
    fixture = TestBed.createComponent(ChangeLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
