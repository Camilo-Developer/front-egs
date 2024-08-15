import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesShowComponent } from './roles-show.component';

describe('RolesShowComponent', () => {
  let component: RolesShowComponent;
  let fixture: ComponentFixture<RolesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
