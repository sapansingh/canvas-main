import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryissuereceivedComponent } from './inventoryissuereceived.component';

describe('InventoryissuereceivedComponent', () => {
  let component: InventoryissuereceivedComponent;
  let fixture: ComponentFixture<InventoryissuereceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryissuereceivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryissuereceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
