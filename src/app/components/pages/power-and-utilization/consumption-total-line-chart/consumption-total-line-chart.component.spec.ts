import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionTotalLineChartComponent } from './consumption-total-line-chart.component';

describe('ConsumptionTotalLineChartComponent', () => {
  let component: ConsumptionTotalLineChartComponent;
  let fixture: ComponentFixture<ConsumptionTotalLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionTotalLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionTotalLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
