import { Character } from './character.model'
export interface Skill {
  id: number;
  name: string;
  description: string;
  skillType: string;
  energy: string;
  character: Character;
}
