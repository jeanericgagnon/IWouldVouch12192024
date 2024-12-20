import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import { Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SOFT_SKILLS, MAX_SOFT_SKILLS, MAX_HARD_SKILLS } from './constants';
import type { SkillsDialogProps } from './types';

export function SkillsDialog({
  isOpen,
  onClose,
  skillType,
  currentSkills,
  onSkillsChange
}: SkillsDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newHardSkill, setNewHardSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(SOFT_SKILLS);

  useEffect(() => {
    if (skillType === 'soft') {
      setFilteredSkills(
        SOFT_SKILLS.filter(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, skillType]);

  const handleAddSkill = (skillName: string, type: 'soft' | 'hard', e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const maxSkills = type === 'soft' ? MAX_SOFT_SKILLS : MAX_HARD_SKILLS;
    const currentTypeSkills = currentSkills.filter(s => s.type === type);
    
    if (currentTypeSkills.length >= maxSkills) {
      toast.error(`You can only add up to ${maxSkills} ${type} skills`);
      return;
    }

    if (!skillName.trim()) return;

    const newSkills = [...currentSkills, { name: skillName.trim(), type }];
    onSkillsChange(newSkills);
    
    if (type === 'hard') {
      setNewHardSkill('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px]" 
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add {skillType === 'soft' ? 'Soft' : 'Hard'} Skill</DialogTitle>
          <DialogDescription>
            {skillType === 'soft' 
              ? `Select from common soft skills or search for specific ones. You can add up to ${MAX_SOFT_SKILLS} soft skills.`
              : `Enter a technical or hard skill. You can add up to ${MAX_HARD_SKILLS} hard skills.`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {skillType === 'soft' ? (
            <>
              <Input
                type="text"
                placeholder="Search soft skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={(e) => handleAddSkill(skill, 'soft', e)}
                    >
                      <span>{skill}</span>
                      {currentSkills.some(s => s.name === skill && s.type === 'soft') && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter hard skill name..."
                value={newHardSkill}
                onChange={(e) => setNewHardSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newHardSkill, 'hard');
                  }
                }}
                autoFocus
              />
              <Button
                type="button"
                className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
                onClick={(e) => handleAddSkill(newHardSkill, 'hard', e)}
              >
                Add Skill
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}