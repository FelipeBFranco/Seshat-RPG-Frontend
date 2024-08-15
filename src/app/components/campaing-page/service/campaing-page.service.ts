import { Injectable } from '@angular/core';
import { Campanha } from '../../shared/models/campaing/campaing.model';

@Injectable({
  providedIn: 'root'
})
export class CampaingPageService {

  constructor() { }

  campains(): Campanha[] {
    return [
      { id: 1, name: 'Masmodan', description: 'O despertar do abismo', icon: 'path/to/icon1.png' },
      { id: 2, name: 'Masmodan', description: 'Multiverso', icon: 'path/to/icon2.png' },
      
    ];
  }
}
