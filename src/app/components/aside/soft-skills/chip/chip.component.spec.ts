import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ChipComponent } from './chip.component';
import { JasmineUtil } from '../../../../utils/jasmine.util';

@Component({
  template: `<app-chip>ng-content test</app-chip>`
})
class ChipTestComponent {}

fdescribe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipTestComponent],
      imports: [ChipComponent],
    });

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render ng-content', () => JasmineUtil.shouldRenderNgContent(ChipTestComponent));
});
