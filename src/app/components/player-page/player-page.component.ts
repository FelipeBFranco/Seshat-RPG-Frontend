import { CharacterInventory } from './../shared/models/character/characterInventory.model';
import { Character } from '../shared/models/character/character.model';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PlayerCharacterService } from './service/player-character.service';
import { Sidebar } from 'primeng/sidebar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CharacterUpdate } from '../shared/models/character/characterUpdate.model';
import { CharacterCreateForm } from '../shared/models/character/Form/characterCreateForm.model';
import { CharacterSkills } from '../shared/models/character/characterSkills.model';
import { ConfirmationService } from 'primeng/api';
import { Skill } from '../shared/models/character/skill.model';


@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrl: './player-page.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
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
  textoDialogForm: string = '';

  itemId: number | undefined;
  skillId: number | undefined;


  playerCharacters: Character[] = [];
  selectedCharacter!: Character

  characterCreateForm: CharacterCreateForm = new CharacterCreateForm();
  creationForm: FormGroup;
  attributesForm: FormGroup;
  characterUpdateForm!: CharacterUpdate;
  cd: ConfirmationService;
  skillForm: FormGroup;
  itemForm: FormGroup;

  labelMapping: { [key: string]: string } = {
    userId: 'ID do Usuário',
    name: 'Nome',
    race: 'Raça',
    classType: 'Classe',
    level: 'Nível',
    health: 'Vida',
    stamina: 'Stamina',
    strength: 'Força',
    agility: 'Agilidade',
    intelligence: 'Inteligência',
    mind: 'Vontade',
    block: 'Bloqueio',
    dodge: 'Esquiva',
    determination: 'Determinação',
    image: 'Imagem',
    description: 'Descrição',
    energy: 'Energia',
    quantity: 'Quantidade',
    campaign: 'Campanha',
    healthMax: 'Vida Máxima',
    mana: 'Mana',
    manaMax: 'Mana Máxima',
    amalgama: 'Amálgama',
    amalgamaMax: 'Amálgama Máximo',
    staminaMax: 'Stamina Máxima',
    experience: 'Experiência'

  };

  characterSkills: CharacterSkills[] = [];
  characterInventory: CharacterInventory[] = [];
  constructor(private playerCharacter: PlayerCharacterService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.cd = this.confirmationService;
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
    this.itemForm = new FormGroup({
      name: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      description: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      energy: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      quantity: new FormControl<number>({ value: 0, disabled: false }, [Validators.required, Validators.minLength(1)]),
    });
    this.skillForm = new FormGroup({
      name: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      description: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
      energy: new FormControl<string>({ value: '', disabled: false }, [Validators.required, Validators.minLength(1)]),
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
    this.selectedCharacter.id = character.id;
    console.log(this.selectedCharacter);
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
  requisicaoInventarioPersonagem(characterId: number | undefined) {
    this.playerCharacter.getCharacterInventoryByCharacterId(characterId!).subscribe((data: CharacterInventory[]) => {
      this.characterInventory = data;
    });
  }

  requisicaoSkillsPersonagem(characterId: number | undefined) {
    this.playerCharacter.getCharacterSkillsByCharacterId(characterId!).subscribe((data: CharacterSkills[]) => {
      this.characterSkills = data;
      console.log(this.characterSkills, data);
    });
  }

  deleteCharacter(character: Character) {
    if (character.id != undefined) {
      this.playerCharacter.deleteCharacter(character.id).subscribe(() => {
        if (this.loggedPlayerId != null) {
          this.playerCharacter.userCharacters(this.loggedPlayerId).subscribe((data: Character[]) => {
            this.playerCharacters = data;
          });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete character' });
      });
    }
  }

  deleteSkill(skill: CharacterSkills) {
    if (skill.id != undefined) {
      this.playerCharacter.deleteSkill(skill.id).subscribe(() => {
        if (this.selectedCharacter.id != undefined) {
          this.playerCharacter.getCharacterSkillsByCharacterId(this.selectedCharacter.id).subscribe((data: CharacterSkills[]) => {
            this.characterSkills = data;
          });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete skill' });
      });
    }
  }

  deleteItem(item: CharacterInventory) {
    if (item.id != undefined) {
      this.playerCharacter.deleteItemFromCharacterInventory(item.id).subscribe(() => {
        if (this.selectedCharacter.id != undefined) {
          this.playerCharacter.getCharacterInventoryByCharacterId(this.selectedCharacter.id).subscribe((data: CharacterInventory[]) => {
            this.characterInventory = data;
          });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Ocorreu um erro ao tentar deletar o item', detail: `${error.error}` });
      });
    }
  }

  createItem(character: Character) {
    console.log(character.id);
    this.playerCharacter.createItemForCharacterInventory(this.itemForm.value, character.id!).subscribe((data: CharacterInventory) => {
      this.messageService.add({ severity: 'success', summary: 'Item criado com sucesso!', detail: `Item ${data.name} criado com sucesso!` });
      this.visible = false;
      if (character.id != undefined) {
        this.playerCharacter.getCharacterInventoryByCharacterId(character.id).subscribe((data: CharacterInventory[]) => {
          this.characterInventory = data;
        });
      }
    });
  }

  createSkill(character: Character) {
    console.log(character.id);
    this.playerCharacter.createSkill(this.skillForm.value, character.id!).subscribe((data: Skill) => {
      this.messageService.add({ severity: 'success', summary: 'Habilidade criada com sucesso!', detail: `Habilidade ${data.name} criada com sucesso!` });
      this.visible = false;
      if (character.id != undefined) {
        this.playerCharacter.getCharacterSkillsByCharacterId(character.id).subscribe((data: CharacterSkills[]) => {
          this.characterSkills = data;
        });
      }
    });
  }

  editItem(itemId: number) {
    this.playerCharacter.updateItemFromCharacterInventory(this.itemForm.value, itemId).subscribe((data: CharacterInventory) => {
      this.messageService.add({ severity: 'success', summary: 'Item editado com sucesso!', detail: `Item ${data.name} editado com sucesso!` });
      this.visible = false;
      if (this.selectedCharacter.id != undefined) {
        this.playerCharacter.getCharacterInventoryByCharacterId(this.selectedCharacter.id).subscribe((data: CharacterInventory[]) => {
          this.characterInventory = data;
        });
      }
    }
    );
  }

  editSkill(skillId: number) {
    this.playerCharacter.updateCharacterSkill(this.skillForm.value, skillId).subscribe((data: Skill) => {
      this.messageService.add({ severity: 'success', summary: 'Habilidade editada com sucesso!', detail: `Habilidade ${data.name} editada com sucesso!` });
      this.visible = false;
      if (this.selectedCharacter.id != undefined) {
        this.playerCharacter.getCharacterSkillsByCharacterId(this.selectedCharacter.id).subscribe((data: CharacterSkills[]) => {
          this.characterSkills = data;
        });
      }
    });
  }


  confirmDeleteCharacter(character: Character) {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja deletar este personagem?',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Personagem deletado com sucesso!', detail: `Personagem ${character.name} foi deletado`, life: 3000 });
        this.deleteCharacter(character);
      }
    })
  }

  confirmDeleteSkill(skill: CharacterSkills) {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja deletar esta habilidade?',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Habilidade deletada com sucesso!', detail: `Habilidade ${skill.name} foi deletada`, life: 3000 });
        this.deleteSkill(skill);
      }
    })
  }

  confirmDeleteItem(item: CharacterInventory) {
    this.confirmationService.confirm({
      message: 'Você tem certeza de que deseja deletar este item?',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Item deletado com sucesso!', detail: `Item ${item.name} foi deletado`, life: 3000 });
        this.deleteItem(item);
      }
    })
  }

  setTextDisplayForDialog(dialogType: string) {
    this.textoDialogForm = dialogType;
  }

  sendItemsInfoToReactiveForm(item: CharacterInventory) {
    this.itemForm.patchValue({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      energy: item.energy
    });
  }

  sendSkillsInfoToReactiveForm(skill: Skill) {
    this.skillForm.patchValue({
      name: skill.name,
      description: skill.description,
      energy: skill.energy
    });
  }

  determineSkillAction(character: Character, textoDialogForm: string, skillId: number) {
    if (textoDialogForm === 'Adicionar Habilidade') {
      this.createSkill(character);
    } else {
      this.editSkill(skillId!);
    }
  }

  determineItemAction(character: Character, textoDialogForm: string, itemId?: number) {
    if (textoDialogForm === 'Adicionar Item') {
      this.createItem(character);
    } else {
      this.editItem(itemId!);
    }
  }

  clearItemAndSkillForms() {
    this.itemForm.reset();
    this.skillForm.reset();
  }
}
