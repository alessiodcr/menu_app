import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNavComponent } from './config-nav.component';

describe('ConfigNavComponent', () => {
  let component: ConfigNavComponent;
  let fixture: ComponentFixture<ConfigNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
