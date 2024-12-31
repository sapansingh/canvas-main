import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdtdashboardComponent } from './mdtdashboard.component';

describe('MdtdashboardComponent', () => {
  let component: MdtdashboardComponent;
  let fixture: ComponentFixture<MdtdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdtdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdtdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
