import { useState } from 'react';
import { Card, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { SkillsList } from './SkillsList';
import { SkillsDialog } from './SkillsDialog';
import { MAX_SOFT_SKILLS, MAX_HARD_SKILLS } from './constants';
import type { SkillsManagerProps } from './types';

export function SkillsManager({ skills, onSkillsChange }: SkillsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'soft' | 'hard'>('soft');

  const handleOpenDialog = (type: 'soft' | 'hard') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleRemoveSkill = (skillToRemove: { name: string; type: 'soft' | 'hard' }) => {
    onSkillsChange(skills.filter(skill => 
      !(skill.name === skillToRemove.name && skill.type === skillToRemove.type)
    ));
  };

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4">
          <CardTitle className="text-lg mb-4">
            Soft Skills ({skills.filter(s => s.type === 'soft').length}/{MAX_SOFT_SKILLS})
          </CardTitle>
          <SkillsList
            skills={skills}
            type="soft"
            onRemoveSkill={handleRemoveSkill}
          />
          <Button 
            type="button" 
            className="w-full mt-4 bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={handleOpenDialog('soft')}
          >
            Add Soft Skill
          </Button>
        </Card>

        <Card className="flex-1 p-4">
          <CardTitle className="text-lg mb-4">
            Hard Skills ({skills.filter(s => s.type === 'hard').length}/{MAX_HARD_SKILLS})
          </CardTitle>
          <SkillsList
            skills={skills}
            type="hard"
            onRemoveSkill={handleRemoveSkill}
          />
          <Button 
            type="button" 
            className="w-full mt-4 bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={handleOpenDialog('hard')}
          >
            Add Hard Skill
          </Button>
        </Card>
      </div>

      <SkillsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        skillType={selectedType}
        currentSkills={skills}
        onSkillsChange={onSkillsChange}
      />
    </div>
  );
}