import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionBarChartComponent } from './consumption-bar-chart.component';

describe('ConsumptionBarChartComponent', () => {
  let component: ConsumptionBarChartComponent;
  let fixture: ComponentFixture<ConsumptionBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
