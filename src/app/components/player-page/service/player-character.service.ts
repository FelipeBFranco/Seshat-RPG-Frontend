import { Skill } from './../../shared/models/character/skill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../shared/models/character/character.model';
import { CharacterUpdate } from '../../shared/models/character/characterUpdate.model';
import { CharacterCreateForm } from '../../shared/models/character/Form/characterCreateForm.model';
import { CharacterInventory } from '../../shared/models/character/characterInventory.model';
import { CharacterSkills } from '../../shared/models/character/characterSkills.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterService {

  apiUrl: string = "http://localhost:8080/characters"
  generalApi: string = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  userCharacters(idPlayer: number) {
    return this.httpClient.get<Character[]>(this.apiUrl + `/${idPlayer}`)
  }

  editCharacter(character: CharacterUpdate, characterId?: number) {
    return this.httpClient.put<CharacterUpdate>(this.apiUrl + `/update/${characterId}`, character)
  }

  createCharacter(character: CharacterCreateForm) {
    return this.httpClient.post<CharacterCreateForm>(this.apiUrl + '/create', character)
  }
  deleteCharacter(characterId: number) {
    return this.httpClient.delete(this.apiUrl + `/delete/${characterId}`)
  }
  // Requisicoes de Skills (Preciso criar outro service urgente pqp :/)
  getCharacterSkillsByCharacterId(id: number) {
    return this.httpClient.get<CharacterSkills[]>(this.generalApi + `/skills/character/${id}`)
  }

  updateCharacterSkill(skill: Skill) {
    return this.httpClient.put<Skill>(this.generalApi + `/skills/${skill.id}`, skill)
  }

  createSkill(skill: Skill, characterId: number) {
    return this.httpClient.post<Skill>(this.generalApi + `/skills/character/${characterId}`, skill)
  }

  deleteSkill(skillId: number) {
    return this.httpClient.delete(this.generalApi + `/skills/${skillId}`)
  }
  // Requisições de Inventário/Itens
  // Sim eu to mto triste com minha criação ;/
  getCharacterInventoryByCharacterId(id: number) {
    return this.httpClient.get<CharacterInventory[]>(this.generalApi + `/inventories/character/${id}`)
  }

  createItemForCharacterInventory(inventory: CharacterInventory, characterId: number) {
    return this.httpClient.post<CharacterInventory>(this.generalApi + `/inventories/character/${characterId}`, inventory)
  }

  updateCharacterInventory(inventory: CharacterInventory) {
    return this.httpClient.put<CharacterInventory>(this.generalApi + `/inventories/${inventory.id}`, inventory)
  }

  deleteItemFromCharacterInventory(inventoryId: number) {
    return this.httpClient.delete(this.generalApi + `/inventories/${inventoryId}`)
  }
}
