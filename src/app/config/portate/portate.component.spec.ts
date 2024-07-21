import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortateComponent } from './portate.component';

describe('PortateComponent', () => {
  let component: PortateComponent;
  let fixture: ComponentFixture<PortateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
