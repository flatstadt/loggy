import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggyComponent } from './loggy.component';

describe('LoggyComponent', () => {
  let component: LoggyComponent;
  let fixture: ComponentFixture<LoggyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
