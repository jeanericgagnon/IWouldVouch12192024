export interface Skill {
  name: string;
  type: 'soft' | 'hard';
}

export interface SkillsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skillType: 'soft' | 'hard';
  currentSkills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

export interface SkillsListProps {
  skills: Skill[];
  type: 'soft' | 'hard';
  onRemoveSkill: (skill: Skill) => void;
}

export interface SkillsManagerProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}