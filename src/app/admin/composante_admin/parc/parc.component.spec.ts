import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcComponent } from './parc.component';

describe('ParcComponent', () => {
  let component: ParcComponent;
  let fixture: ComponentFixture<ParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
