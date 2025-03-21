import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinateurComponent } from './ordinateur.component';

describe('OrdinateurComponent', () => {
  let component: OrdinateurComponent;
  let fixture: ComponentFixture<OrdinateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdinateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdinateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
