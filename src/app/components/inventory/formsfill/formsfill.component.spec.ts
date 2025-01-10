import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsfillComponent } from './formsfill.component';

describe('FormsfillComponent', () => {
  let component: FormsfillComponent;
  let fixture: ComponentFixture<FormsfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsfillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
