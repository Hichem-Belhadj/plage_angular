import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTrouveComponent } from './non-trouve.component';

describe('NonTrouveComponent', () => {
  let component: NonTrouveComponent;
  let fixture: ComponentFixture<NonTrouveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonTrouveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonTrouveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
