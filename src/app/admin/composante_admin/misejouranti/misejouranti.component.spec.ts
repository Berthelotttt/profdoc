import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisejourantiComponent } from './misejouranti.component';

describe('MisejourantiComponent', () => {
  let component: MisejourantiComponent;
  let fixture: ComponentFixture<MisejourantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisejourantiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisejourantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
