import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { X } from 'lucide-react';
import type { SkillsListProps } from './types';

export function SkillsList({ skills, type, onRemoveSkill }: SkillsListProps) {
  const filteredSkills = skills.filter(skill => skill.type === type);
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveSkill(skill);
            }}
            className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}