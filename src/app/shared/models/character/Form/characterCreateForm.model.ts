interface ICharacterCreateForm {
  userId?: number;
  name: string;
  race: string;
  classType: string;
  level: number;
  health: number;
  stamina: number;
  strength: number;
  agility: number;
  intelligence: number;
  mind: number;
  block: number;
  dodge: number;
  determination: number;
  image: string;
}

export class CharacterCreateForm implements ICharacterCreateForm {
  userId?: number = undefined;
  name: string = '';
  race: string = '';
  classType: string = '';
  level: number = 0;
  health: number = 0;
  stamina: number = 0;
  strength: number = 0;
  agility: number = 0;
  intelligence: number = 0;
  mind: number = 0;
  block: number = 0;
  dodge: number = 0;
  determination: number = 0;
  image: string = '';
}
