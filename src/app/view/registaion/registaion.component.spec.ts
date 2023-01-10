import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistaionComponent } from './registaion.component';

describe('RegistaionComponent', () => {
  let component: RegistaionComponent;
  let fixture: ComponentFixture<RegistaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
