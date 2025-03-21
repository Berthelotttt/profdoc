import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleSecuriteComponent } from './cle-securite.component';

describe('CleSecuriteComponent', () => {
  let component: CleSecuriteComponent;
  let fixture: ComponentFixture<CleSecuriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleSecuriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
