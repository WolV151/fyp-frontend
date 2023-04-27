import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostLineChartComponent } from './cost-line-chart.component';

describe('CostLineChartComponent', () => {
  let component: CostLineChartComponent;
  let fixture: ComponentFixture<CostLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
