import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvrdashboardComponent } from './nvrdashboard.component';

describe('NvrdashboardComponent', () => {
  let component: NvrdashboardComponent;
  let fixture: ComponentFixture<NvrdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NvrdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvrdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
