import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChipsComponent } from './item-chips.component';

describe('ItemChipsComponent', () => {
  let component: ItemChipsComponent;
  let fixture: ComponentFixture<ItemChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemChipsComponent]
    });
    fixture = TestBed.createComponent(ItemChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
