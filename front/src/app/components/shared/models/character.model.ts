import { Attributes } from "./attributes.model"

export interface Character {
  id: number
  name: string
  image: string
  attributes: Attributes
  userId: number
  race: string
  classType: string
}
