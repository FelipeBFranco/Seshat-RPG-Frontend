import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterService {

  apiUrl: string = "http://localhost:8080/characters"

  constructor(private httpClient: HttpClient) { }

  userCharacters(idPlayer: number){
    return this.httpClient.get<Character[]>(this.apiUrl + `/${idPlayer}`)
  }
}
