import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { SectionTitleComponent } from './section-title.component';

xdescribe('SectionTitleComponent', () => {
  let component: SectionTitleComponent;
  let fixture: ComponentFixture<SectionTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularSvgIconModule,
        TranslateModule,
      ],
    });
    fixture = TestBed.createComponent(SectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
