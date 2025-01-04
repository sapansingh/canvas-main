import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisscallComponent } from './misscall.component';

describe('MisscallComponent', () => {
  let component: MisscallComponent;
  let fixture: ComponentFixture<MisscallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisscallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisscallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
