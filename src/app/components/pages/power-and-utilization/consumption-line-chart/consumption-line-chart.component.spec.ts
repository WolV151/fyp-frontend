import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionLineChartComponent } from './consumption-line-chart.component';

describe('ConsumptionLineChartComponent', () => {
  let component: ConsumptionLineChartComponent;
  let fixture: ComponentFixture<ConsumptionLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
