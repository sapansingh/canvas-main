import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnaComponent } from './vna.component';

describe('VnaComponent', () => {
  let component: VnaComponent;
  let fixture: ComponentFixture<VnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
