import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUpdateComponent } from './roles-update.component';

describe('RolesUpdateComponent', () => {
  let component: RolesUpdateComponent;
  let fixture: ComponentFixture<RolesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
