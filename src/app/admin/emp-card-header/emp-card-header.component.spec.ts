import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCardHeaderComponent } from './emp-card-header.component';

describe('EmpCardHeaderComponent', () => {
  let component: EmpCardHeaderComponent;
  let fixture: ComponentFixture<EmpCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
