import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtrComponent } from './vtr.component';

describe('VtrComponent', () => {
  let component: VtrComponent;
  let fixture: ComponentFixture<VtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
