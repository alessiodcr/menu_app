import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergeniComponent } from './allergeni.component';

describe('AllergeniComponent', () => {
  let component: AllergeniComponent;
  let fixture: ComponentFixture<AllergeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergeniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllergeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
