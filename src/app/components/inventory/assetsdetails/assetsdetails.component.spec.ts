import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsdetailsComponent } from './assetsdetails.component';

describe('AssetsdetailsComponent', () => {
  let component: AssetsdetailsComponent;
  let fixture: ComponentFixture<AssetsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
