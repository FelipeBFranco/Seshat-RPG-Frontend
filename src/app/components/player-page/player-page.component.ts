import { Character } from '../shared/models/character/character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerCharacterService } from './service/player-character.service';
import { Sidebar } from 'primeng/sidebar';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CharacterUpdate } from '../shared/models/character/characterUpdate.model';
@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss',
  providers: [MessageService]
})
export class PlayerPageComponent implements OnInit {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  loggedPlayerName: string | null = null;
  loggedPlayerId: number | null = null;
  sidebarVisible: boolean = false;
  visible: boolean = false;
  toastIsVisible = false;
  tipoDialogForm: string = 'Criar';

  playerCharacters: Character[] = [];
  selectedCharacter!: Character

  attributesForm: FormGroup;
  characterUpdateForm!: CharacterUpdate;

  constructor(private playerCharacter: PlayerCharacterService, private messageService: MessageService) {
    this.attributesForm = new FormGroup({
      campaign: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      name: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      strength: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      agility: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      mind: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      intelligence: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      block: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      determination: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      dodge: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      health: new FormControl<number>({ value: 0, disabled: false, }, [Validators.required, Validators.minLength(1)]),
      healthMax: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      mana: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      manaMax: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      amalgama: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      amalgamaMax: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      stamina: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      staminaMax: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedPlayerName = localStorage.getItem('name');
      this.loggedPlayerId = Number(localStorage.getItem('id'));
    }

    if (this.loggedPlayerId != null) {
      this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
        this.playerCharacters = data;
      });
    }
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.importCharacterToReactiveForm(character);
  }

  closeCallback(e: any): void {
    this.sidebarVisible = e;
  }

  dynamicWidth(value: number): string {
    const dynamicWidth = (value / 100) * 100;
    return `${dynamicWidth}%`;
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  importCharacterToReactiveForm(character: Character) {
    this.attributesForm.patchValue({
      strength: character.attributes.strength,
      agility: character.attributes.agility,
      mind: character.attributes.mind,
      intelligence: character.attributes.intelligence,
      block: character.attributes.block,
      determination: character.attributes.determination,
      dodge: character.attributes.dodge,
      health: character.attributes.health,
      healthMax: character.attributes.healthMax,
      mana: character.attributes.mana,
      manaMax: character.attributes.manaMax,
      amalgama: character.attributes.amalgama,
      amalgamaMax: character.attributes.amalgamaMax,
      stamina: character.attributes.stamina,
      staminaMax: character.attributes.staminaMax,
      name: character.name,
      campaign: character.campaign
    });
  }

  public getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  requisicaoMudarAtributos() {
    this.selectedCharacter.attributes = this.attributesForm.value;
    this.playerCharacter.editCharacter(this.selectedCharacter, this.selectedCharacter.id).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atributos alterados com sucesso!' });
      console.log(data);
    })
  }

  clearSelectedCharacter() {
    // this.selectedCharacter = new Character();
  }
}
