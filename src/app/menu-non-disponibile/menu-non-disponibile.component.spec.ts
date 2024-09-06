import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNonDisponibileComponent } from './menu-non-disponibile.component';

describe('MenuNonDisponibileComponent', () => {
  let component: MenuNonDisponibileComponent;
  let fixture: ComponentFixture<MenuNonDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNonDisponibileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuNonDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
