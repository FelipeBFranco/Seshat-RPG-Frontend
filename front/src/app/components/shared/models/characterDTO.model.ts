import { Attributes } from "./attributes.model"
import { CharacterInventory } from "./characterInventory.model"

export interface CharacterDTO {
  id: number
  name: string
  image: string
  attributes: Attributes
  inventory: CharacterInventory[]
  userId: number
  race: string
  classType: string
}
