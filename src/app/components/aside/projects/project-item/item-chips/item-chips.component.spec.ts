import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChipsComponent } from './item-chips.component';

xdescribe('ItemChipsComponent', () => {
  let component: ItemChipsComponent;
  let fixture: ComponentFixture<ItemChipsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
