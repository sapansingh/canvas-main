import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsdashboardComponent } from './assetsdashboard.component';

describe('AssetsdashboardComponent', () => {
  let component: AssetsdashboardComponent;
  let fixture: ComponentFixture<AssetsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
