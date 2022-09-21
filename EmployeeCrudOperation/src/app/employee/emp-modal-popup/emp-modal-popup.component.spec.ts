import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpModalPopupComponent } from './emp-modal-popup.component';

describe('EmpModalPopupComponent', () => {
  let component: EmpModalPopupComponent;
  let fixture: ComponentFixture<EmpModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpModalPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
