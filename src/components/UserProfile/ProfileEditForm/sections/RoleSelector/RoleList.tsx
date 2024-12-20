import { Button } from "../../../../ui/button";
import { Badge } from "../../../../ui/badge";
import { Briefcase, X } from 'lucide-react';
import type { Role } from './types';

interface RoleListProps {
  roles: Role[];
  onRemove: (index: number) => void;
}

export function RoleList({ roles, onRemove }: RoleListProps) {
  if (roles.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="pl-2 pr-1 py-1 flex items-center space-x-1"
        >
          <Briefcase className="h-3 w-3 mr-1" />
          <span>{role.formatted}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}