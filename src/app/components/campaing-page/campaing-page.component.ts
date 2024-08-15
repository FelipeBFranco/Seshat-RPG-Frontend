import { Component, OnInit } from '@angular/core';
import { Campanha } from '../shared/models/campaing/campaing.model';
import { CampaingPageService } from './service/campaing-page.service';


@Component({
  selector: 'app-campaing-page',
  templateUrl: './campaing-page.component.html',
  styleUrls: ['./campaing-page.component.scss']
})
export class CampaingPageComponent implements OnInit {

  campaigns: Campanha[] = [];

  constructor(private campaingPageService: CampaingPageService) { }

  ngOnInit(): void {
    this.campaigns = this.campaingPageService.campains();
  }

  selectCampaign(campaign: Campanha) {
    console.log('Campaign selected:', campaign.name);
  }
}
