/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerCharacterService } from './player-character.service';

describe('Service: PlayerCharacter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerCharacterService]
    });
  });

  it('should ...', inject([PlayerCharacterService], (service: PlayerCharacterService) => {
    expect(service).toBeTruthy();
  }));
});
