import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../shared/models/character/character.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterService {

  apiUrl: string = "http://localhost:8080/characters"

  constructor(private httpClient: HttpClient) { }

  userCharacters(idPlayer: number){
    return this.httpClient.get<Character[]>(this.apiUrl + `/${idPlayer}`)
  }

  editCharacter(character: Character, characterId: number){
    return this.httpClient.put<Character>(this.apiUrl + `/update/${characterId}`, character)
  }
}
