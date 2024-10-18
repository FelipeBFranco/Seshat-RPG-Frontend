import { Attributes } from "./attributes.model"

interface ICharacter {
  id?: number
  name: string
  image: string
  attributes: Attributes
  userId: number
  userName: string
  race: string
  classType: string
  campaign: string
}

export class Character implements ICharacter {
  id?: undefined
  name: string = ''
  image: string = ''
  attributes: Attributes = new Attributes()
  userId: number = 0
  userName: string = ''
  race: string = ''
  classType: string = ''
  campaign: string = ''
  constructor() {
  }
}
