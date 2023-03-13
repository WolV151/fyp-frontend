import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationLineGaugeComponent } from './utilization-line-gauge.component';

describe('UtilizationLineGaugeComponent', () => {
  let component: UtilizationLineGaugeComponent;
  let fixture: ComponentFixture<UtilizationLineGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizationLineGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizationLineGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
