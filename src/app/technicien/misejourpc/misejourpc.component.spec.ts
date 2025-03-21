import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisejourpcComponent } from './misejourpc.component';

describe('MisejourpcComponent', () => {
  let component: MisejourpcComponent;
  let fixture: ComponentFixture<MisejourpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisejourpcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisejourpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
