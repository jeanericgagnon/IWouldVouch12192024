import { useState } from 'react';
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Card, CardTitle } from "../../../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { ScrollArea } from "../../../ui/scroll-area";
import { X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Skill } from '../../../../types/user';

interface SkillsSectionProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const SOFT_SKILLS = [
  "Communication", "Teamwork", "Adaptability", "Problem-solving", "Time management",
  "Leadership", "Creativity", "Work ethic", "Attention to detail", "Conflict resolution",
  "Emotional intelligence", "Decision-making", "Interpersonal skills", "Flexibility",
  "Critical thinking", "Collaboration", "Self-motivation", "Empathy", "Patience",
  "Listening skills"
];

const MAX_SOFT_SKILLS = 3;
const MAX_HARD_SKILLS = 5;

export function SkillsSection({ skills, onSkillsChange }: SkillsSectionProps) {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillType, setSkillType] = useState<'soft' | 'hard'>('soft');
  const [searchTerm, setSearchTerm] = useState('');
  const [newHardSkill, setNewHardSkill] = useState('');

  const handleAddSkill = (skillName: string, type: 'soft' | 'hard') => {
    const maxSkills = type === 'soft' ? MAX_SOFT_SKILLS : MAX_HARD_SKILLS;
    const currentTypeSkills = skills.filter(s => s.type === type);
    
    if (currentTypeSkills.length >= maxSkills) {
      toast.error(`You can only add up to ${maxSkills} ${type} skills`);
      return;
    }

    if (!skillName.trim()) return;

    const newSkills = [...skills, { name: skillName.trim(), type }];
    onSkillsChange(newSkills);
    
    if (type === 'hard') {
      setNewHardSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    const newSkills = skills.filter(skill => 
      !(skill.name === skillToRemove.name && skill.type === skillToRemove.type)
    );
    onSkillsChange(newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4">
          <CardTitle className="text-lg mb-4">
            Soft Skills ({skills.filter(s => s.type === 'soft').length}/{MAX_SOFT_SKILLS})
          </CardTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.filter(s => s.type === 'soft').map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="bg-[#6b9cc3] text-white px-3 py-1 text-sm font-medium rounded-full"
              >
                {skill.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button 
            type="button" 
            className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={() => {
              setSkillType('soft');
              setIsAddingSkill(true);
            }}
          >
            Add Soft Skill
          </Button>
        </Card>

        <Card className="flex-1 p-4">
          <CardTitle className="text-lg mb-4">
            Hard Skills ({skills.filter(s => s.type === 'hard').length}/{MAX_HARD_SKILLS})
          </CardTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.filter(s => s.type === 'hard').map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="bg-[#52789e] text-white px-3 py-1 text-sm font-medium rounded-full"
              >
                {skill.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button 
            type="button" 
            className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={() => {
              setSkillType('hard');
              setIsAddingSkill(true);
            }}
          >
            Add Hard Skill
          </Button>
        </Card>
      </div>

      <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {skillType === 'soft' ? 'Soft' : 'Hard'} Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {skillType === 'soft' ? (
              <>
                <Input
                  placeholder="Search soft skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {SOFT_SKILLS
                      .filter(skill => 
                        skill.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                          onClick={() => handleAddSkill(skill, 'soft')}
                        >
                          <div className="flex-1">{skill}</div>
                          {skills.some(s => s.name === skill && s.type === 'soft') && (
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
                  onClick={() => handleAddSkill(newHardSkill, 'hard')}
                >
                  Add Skill
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}