import { Attributes } from "./attributes.model"

export interface Character {
  id: number
  name: string
  image: string
  attributes: Attributes
  userId: number
  userName:string
  race: string
  classType: string
  campaign : string
}
