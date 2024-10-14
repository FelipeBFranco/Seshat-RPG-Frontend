import { Skill } from './skill.model';

export interface CharacterSkills {
  id: number;
  name: string;
  skills: Skill[];
}
