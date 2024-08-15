import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingPageComponent } from './campaing-page.component';

describe('CampaingPageComponent', () => {
  let component: CampaingPageComponent;
  let fixture: ComponentFixture<CampaingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
