import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleComponent } from './cle.component';

describe('CleComponent', () => {
  let component: CleComponent;
  let fixture: ComponentFixture<CleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
