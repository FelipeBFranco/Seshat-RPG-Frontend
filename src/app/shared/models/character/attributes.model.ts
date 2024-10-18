interface IAttributes {
  id?: number
  level: number
  experience: number
  health: number
  stamina: number
  mana: number
  amalgama: number
  strength: number
  agility: number
  intelligence: number
  mind: number
  block: number
  dodge: number
  determination: number
  healthMax: number
  manaMax: number
  staminaMax: number
  amalgamaMax: number
}

export class Attributes implements IAttributes {
  level: number = 0
  experience: number = 0
  health: number = 0
  stamina: number = 0
  mana: number = 0
  amalgama: number = 0
  strength: number = 0
  agility: number = 0
  intelligence: number = 0
  mind: number = 0
  block: number = 0
  dodge: number = 0
  determination: number = 0
  healthMax: number = 0
  manaMax: number = 0
  staminaMax: number = 0
  amalgamaMax: number = 0
  constructor() {
  }
}
