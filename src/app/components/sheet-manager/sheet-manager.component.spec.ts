import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetManagerComponent } from './sheet-manager.component';

describe('SheetManagerComponent', () => {
  let component: SheetManagerComponent;
  let fixture: ComponentFixture<SheetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheetManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
