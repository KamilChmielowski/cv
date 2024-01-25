import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChipsComponent } from './item-chips.component';

describe('ItemChipsComponent', () => {
  let component: ItemChipsComponent;
  let fixture: ComponentFixture<ItemChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemChipsComponent],
    }).overrideComponent(ItemChipsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(ItemChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render chips count based on input', () => {
    component.chips = ['test1', 'test2'];
    fixture.detectChanges();

    const chipsEl = fixture.debugElement.queryAll(By.css('span'));

    expect(chipsEl.length).toEqual(component.chips.length);
  });

  it('should set classes equal to chip\'s texts', () => {
    component.chips = ['test1', 'test2'];
    fixture.detectChanges();

    const chipsEl = fixture.debugElement.queryAll(By.css('span'));

    expect(chipsEl.every((chip, i) => chip.classes[chip.componentInstance.chips[i]])).toBeTrue();
  });

  it('should render text using title case', () => {
    component.chips = ['test1', 'test2 test2', 'Test3'];
    fixture.detectChanges();

    const chipsEl = fixture.debugElement.queryAll(By.css('span'));

    expect(chipsEl[0].nativeElement.textContent).toEqual('Test1');
    expect(chipsEl[1].nativeElement.textContent).toEqual('Test2 Test2');
    expect(chipsEl[2].nativeElement.textContent).toEqual('Test3');
  });
});
