import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { X, Check } from 'lucide-react';
import { Skill } from '../../types/user';

const softSkills = [
  "Communication", "Teamwork", "Adaptability", "Problem-solving", "Time management",
  "Leadership", "Creativity", "Work ethic", "Attention to detail", "Conflict resolution",
  "Emotional intelligence", "Decision-making", "Interpersonal skills", "Flexibility",
  "Critical thinking", "Collaboration", "Self-motivation", "Empathy", "Patience",
  "Listening skills", "Negotiation", "Stress management", "Persuasion", "Cultural awareness",
  "Mentorship", "Resilience", "Integrity", "Accountability", "Delegation", "Public speaking"
];

interface SkillSelectorProps {
  selectedSkills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  skillType: 'soft' | 'hard';
  isOpen: boolean;
  onClose: () => void;
}

export function SkillSelector({
  selectedSkills = [],
  onSkillsChange,
  skillType,
  isOpen,
  onClose,
}: SkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newHardSkill, setNewHardSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>(softSkills);

  useEffect(() => {
    if (skillType === 'soft') {
      const filtered = softSkills.filter(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  }, [searchTerm, skillType]);

  const toggleSkill = (skill: string, type: 'soft' | 'hard') => {
    const maxSoftSkills = 3;
    const maxHardSkills = 5;

    onSkillsChange(prevSkills => {
      const currentSkills = prevSkills || [];
      const isSelected = currentSkills.some(s => s.name === skill && s.type === type);
      
      if (isSelected) {
        return currentSkills.filter(s => s.name !== skill || s.type !== type);
      } else {
        const currentTypeSkills = currentSkills.filter(s => s.type === type);
        if ((type === 'soft' && currentTypeSkills.length < maxSoftSkills) ||
            (type === 'hard' && currentTypeSkills.length < maxHardSkills)) {
          return [...currentSkills, { name: skill, type }];
        }
      }
      return currentSkills;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle>Add {skillType === 'soft' ? 'Soft' : 'Hard'} Skill</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill">Skill</Label>
            {skillType === 'soft' ? (
              <>
                <Input
                  id="skill"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  placeholder="Search Soft Skill"
                />
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="space-y-2">
                    {filteredSkills.map((skill) => (
                      <button
                        key={skill}
                        className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md cursor-pointer text-left"
                        onClick={() => toggleSkill(skill, 'soft')}
                      >
                        <span>{skill}</span>
                        {selectedSkills.some(s => s.name === skill && s.type === 'soft') && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
                {selectedSkills.filter(s => s.type === 'soft').length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Selected Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills
                        .filter(s => s.type === 'soft')
                        .map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="bg-[#6b9cc3] text-white"
                          >
                            {skill.name}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill.name, 'soft');
                              }}
                              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <Input
                  id="skill"
                  value={newHardSkill}
                  onChange={(e) => setNewHardSkill(e.target.value)}
                  placeholder="Enter hard skill name..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newHardSkill.trim()) {
                        toggleSkill(newHardSkill.trim(), 'hard');
                        setNewHardSkill('');
                      }
                    }
                  }}
                />
                {selectedSkills.filter(s => s.type === 'hard').length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Selected Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills
                        .filter(s => s.type === 'hard')
                        .map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="secondary"
                            className="bg-[#52789e] text-white"
                          >
                            {skill.name}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill.name, 'hard');
                              }}
                              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button 
          onClick={() => {
            if (skillType === 'hard' && newHardSkill) {
              toggleSkill(newHardSkill, 'hard');
              onClose();
            } else if (skillType === 'soft') {
              onClose();
            }
          }}
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {skillType === 'soft' ? 'Close' : 'Save'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}