import { useState, useCallback } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Skill {
  name: string;
  type: 'soft' | 'hard';
}

interface SkillsSectionProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const softSkills = [
  "Communication", "Teamwork", "Adaptability", "Problem-solving", "Time management",
  "Leadership", "Creativity", "Work ethic", "Attention to detail", "Conflict resolution",
  "Emotional intelligence", "Decision-making", "Interpersonal skills", "Flexibility",
  "Critical thinking", "Collaboration", "Self-motivation", "Empathy", "Patience",
  "Listening skills"
];

export function SkillsSection({ skills, onSkillsChange }: SkillsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skillType, setSkillType] = useState<'soft' | 'hard'>('soft');
  const [searchTerm, setSearchTerm] = useState('');
  const [newHardSkill, setNewHardSkill] = useState('');

  const handleOpenDialog = useCallback((type: 'soft' | 'hard', e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSkillType(type);
    setIsDialogOpen(true);
  }, []);

  const handleRemoveSkill = useCallback((skillToRemove: Skill, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    onSkillsChange(skills.filter(skill => 
      !(skill.name === skillToRemove.name && skill.type === skillToRemove.type)
    ));
  }, [skills, onSkillsChange]);

  const handleAddSkill = useCallback((skillName: string, type: 'soft' | 'hard') => {
    const maxSkills = type === 'soft' ? 3 : 5;
    const currentTypeSkills = skills.filter(s => s.type === type);
    
    if (currentTypeSkills.length >= maxSkills && 
        !skills.some(s => s.name === skillName && s.type === type)) {
      toast.error(`You can only add up to ${maxSkills} ${type} skills`);
      return;
    }

    if (!skillName.trim()) return;

    const newSkills = [...skills, { name: skillName.trim(), type }];
    onSkillsChange(newSkills);
    
    if (type === 'hard') {
      setNewHardSkill('');
      setIsDialogOpen(false);
    }
  }, [skills, onSkillsChange]);

  const renderSkillList = (type: 'soft' | 'hard') => {
    const filteredSkills = skills.filter(s => s.type === type);
    const bgColor = type === 'soft' ? 'bg-[#6b9cc3]' : 'bg-[#52789e]';

    return (
      <div className="flex flex-wrap gap-2">
        {filteredSkills.map((skill) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className={`${bgColor} text-white px-3 py-1 text-sm font-medium rounded-full`}
          >
            {skill.name}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => handleRemoveSkill(skill, e)}
              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Soft Skills */}
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-semibold">
            Soft Skills ({skills.filter(s => s.type === 'soft').length}/3)
          </h3>
          {renderSkillList('soft')}
          <Button 
            type="button" 
            className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={(e) => handleOpenDialog('soft', e)}
          >
            Add Soft Skill
          </Button>
        </div>

        {/* Hard Skills */}
        <div className="flex-1 space-y-4">
          <h3 className="text-lg font-semibold">
            Hard Skills ({skills.filter(s => s.type === 'hard').length}/5)
          </h3>
          {renderSkillList('hard')}
          <Button 
            type="button" 
            className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={(e) => handleOpenDialog('hard', e)}
          >
            Add Hard Skill
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {softSkills
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