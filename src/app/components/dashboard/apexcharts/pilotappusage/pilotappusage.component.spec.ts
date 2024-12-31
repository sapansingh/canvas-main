import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotappusageComponent } from './pilotappusage.component';

describe('PilotappusageComponent', () => {
  let component: PilotappusageComponent;
  let fixture: ComponentFixture<PilotappusageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotappusageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotappusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
