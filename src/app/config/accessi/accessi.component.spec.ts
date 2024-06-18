import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessiComponent } from './accessi.component';

describe('AccessiComponent', () => {
  let component: AccessiComponent;
  let fixture: ComponentFixture<AccessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
