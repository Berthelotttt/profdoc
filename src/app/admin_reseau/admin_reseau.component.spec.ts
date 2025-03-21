import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReseauComponent } from './admin_reseau.component';

describe('AdminReseauComponent', () => {
  let component: AdminReseauComponent;
  let fixture: ComponentFixture<AdminReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReseauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
