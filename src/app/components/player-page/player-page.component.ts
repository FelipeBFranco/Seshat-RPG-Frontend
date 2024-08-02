import { CharacterInventory } from './../shared/models/character/characterInventory.model';
import { Character } from '../shared/models/character/character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerCharacterService } from './service/player-character.service';
import { Sidebar } from 'primeng/sidebar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CharacterUpdate } from '../shared/models/character/characterUpdate.model';
import { CharacterCreateForm } from '../shared/models/character/Form/characterCreateForm.model';
import { CharacterSkills } from '../shared/models/character/characterSkills.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss',
  providers: [MessageService],
  animations: [

  ]
})

export class PlayerPageComponent implements OnInit {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  nomePlayerLogado!: string;
  idPlayerLogado!: number;
  loggedPlayerName: string | null = null
  loggedPlayerId!: number;
  sidebarVisible: boolean = false;
  visible: boolean = false;
  visibilityDialogSkills: boolean = false;
  visibilityDialogInventory: boolean = false;
  toastIsVisible = false;
  tipoDialogForm: string = 'Criar';

  playerCharacters: Character[] = [];
  selectedCharacter!: Character

  characterCreateForm: CharacterCreateForm = new CharacterCreateForm();
  creationForm: FormGroup;
  attributesForm: FormGroup;
  characterUpdateForm!: CharacterUpdate;

  characterSkills: CharacterSkills[] = [];
  characterInventory: CharacterInventory[] = [];

  constructor(private playerCharacter: PlayerCharacterService, private messageService: MessageService) {
    this.creationForm = new FormGroup({
      userId: new FormControl<number>({ value: this.loggedPlayerId, disabled: false }, [Validators.required, Validators.minLength(1)]),
      name: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      race: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      classType: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      level: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      health: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      stamina: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      strength: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      agility: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      intelligence: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      mind: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      block: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      dodge: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      determination: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
      image: new FormControl<string>({ value: '', disabled: false }),
    });
    this.attributesForm = new FormGroup({
      campaign: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]),
      name: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]),
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
      experience: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
    });

  }

  ngOnInit() {

    if (typeof window !== 'undefined') {
      this.loggedPlayerName = localStorage.getItem('name');
      this.loggedPlayerId = Number(localStorage.getItem('id'));
      this.nomePlayerLogado = this.loggedPlayerName!;
      this.idPlayerLogado = this.loggedPlayerId!;
      this.creationForm.get('userId')?.setValue(this.loggedPlayerId);
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
    this.attributesForm.get('name')?.disable();
    this.attributesForm.get('campaign')?.disable();
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
      campaign: character.campaign,
      experience: character.attributes.experience
    });
  }

  public getCamposFormularioReativoEdicaoPersonagem(obj: any): string[] {
    return Object.keys(obj);
  }
  public getCamposFormularioReativoCriacaoPersonagem(obj: any): string[] {
    return Object.keys(obj);
  }

  requisicaoMudarAtributos() {
    this.characterUpdateForm = {
      userId: this.loggedPlayerId,
      name: this.attributesForm.get('name')?.value,
      race: this.selectedCharacter.race,
      classType: this.selectedCharacter.classType,
      level: this.selectedCharacter.attributes.level,
      health: this.attributesForm.get('health')?.value,
      stamina: this.attributesForm.get('stamina')?.value,
      amalgama: this.attributesForm.get('amalgama')?.value,
      mana: this.attributesForm.get('mana')?.value,
      strength: this.attributesForm.get('strength')?.value,
      agility: this.attributesForm.get('agility')?.value,
      intelligence: this.attributesForm.get('intelligence')?.value,
      mind: this.attributesForm.get('mind')?.value,
      block: this.attributesForm.get('block')?.value,
      dodge: this.attributesForm.get('dodge')?.value,
      determination: this.attributesForm.get('determination')?.value,
      campaign: this.attributesForm.get('campaign')?.value,
      experience: this.attributesForm.get('experience')?.value,
      staminaMax: this.attributesForm.get('staminaMax')?.value,
      healthMax: this.attributesForm.get('healthMax')?.value,
      amalgamaMax: this.attributesForm.get('amalgamaMax')?.value,
      manaMax: this.attributesForm.get('manaMax')?.value
    }
    this.playerCharacter.editCharacter(this.characterUpdateForm, this.selectedCharacter.id).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atributos alterados com sucesso!' });
      if (this.loggedPlayerId != null) {
        this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
          this.playerCharacters = data;
        });
      }
      this.updateSelectedCharacter(data);
    })
  }

  clearSelectedCharacter() {
    this.attributesForm.reset();
    this.attributesForm.get('name')?.enable();
    this.attributesForm.get('campaign')?.enable();
  }

  getType(controlName: string): string {
    const value = this.attributesForm.get(controlName)?.value;
    console.log(typeof value);
    return typeof value;
  }

  updateSelectedCharacter(data: CharacterUpdate) {
    this.selectedCharacter.attributes.health = data.health;
    this.selectedCharacter.attributes.stamina = data.stamina;
    this.selectedCharacter.attributes.amalgama = data.amalgama;
    this.selectedCharacter.attributes.mana = data.mana;
    this.selectedCharacter.attributes.strength = data.strength;
    this.selectedCharacter.attributes.agility = data.agility;
    this.selectedCharacter.attributes.intelligence = data.intelligence;
    this.selectedCharacter.attributes.mind = data.mind;
    this.selectedCharacter.attributes.block = data.block;
    this.selectedCharacter.attributes.dodge = data.dodge;
    this.selectedCharacter.attributes.determination = data.determination;
    this.selectedCharacter.attributes.healthMax = data.healthMax;
    this.selectedCharacter.attributes.staminaMax = data.staminaMax;
    this.selectedCharacter.attributes.amalgamaMax = data.amalgamaMax;
    this.selectedCharacter.attributes.manaMax = data.manaMax;
    this.selectedCharacter.name = data.name;
    this.selectedCharacter.campaign = data.campaign;
    this.selectedCharacter.attributes.experience = data.experience;
  }

  createCharacter() {
    this.creationForm.get('userId')!.enable();
    this.characterCreateForm = this.creationForm.value;
    this.playerCharacter.createCharacter(this.characterCreateForm).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Personagem criado com sucesso!' });
      this.visible = false;
      if (this.loggedPlayerId != null) {
        this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
          this.playerCharacters = data;
        });
      }
    });
    if (this.creationForm) {
      this.creationForm.reset();
      this.creationForm.get('userId')?.setValue(this.loggedPlayerId);
    }
  }

  requisicaoInventarioPersonagem(userId: number) {
    this.playerCharacter.getCharacterInventoryByUserId(userId).subscribe((data: CharacterInventory[]) => {
      this.characterInventory = data;
      console.log(this.characterInventory, data);
    });
    this.visibilityDialogInventory = true;
  }

  requisicaoSkillsPersonagem(userId: number) {
    this.playerCharacter.getCharacterSkillsByUserId(userId).subscribe((data: CharacterSkills[]) => {
      this.characterSkills = data;
      console.log(this.characterSkills, data);
    });
    this.visibilityDialogSkills = true;
  }
}
