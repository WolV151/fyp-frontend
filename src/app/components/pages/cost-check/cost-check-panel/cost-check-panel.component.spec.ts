import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCheckPanelComponent } from './cost-check-panel.component';

describe('CostCheckPanelComponent', () => {
  let component: CostCheckPanelComponent;
  let fixture: ComponentFixture<CostCheckPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCheckPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCheckPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
