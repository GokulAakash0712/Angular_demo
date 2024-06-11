import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordCompComponent } from './forgot-password-comp.component';

describe('ForgotPasswordCompComponent', () => {
  let component: ForgotPasswordCompComponent;
  let fixture: ComponentFixture<ForgotPasswordCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPasswordCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
