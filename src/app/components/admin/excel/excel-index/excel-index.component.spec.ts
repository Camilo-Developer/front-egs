import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelIndexComponent } from './excel-index.component';

describe('ExcelIndexComponent', () => {
  let component: ExcelIndexComponent;
  let fixture: ComponentFixture<ExcelIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
