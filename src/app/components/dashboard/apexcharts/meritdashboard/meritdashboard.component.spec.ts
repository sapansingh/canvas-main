import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritdashboardComponent } from './meritdashboard.component';

describe('MeritdashboardComponent', () => {
  let component: MeritdashboardComponent;
  let fixture: ComponentFixture<MeritdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeritdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeritdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
