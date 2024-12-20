import { useState } from 'react';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";
import { Briefcase, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface RoleSelectorProps {
  roles: string[];
  onRolesChange: (roles: string[]) => void;
}

export function RoleSelector({ roles, onRolesChange }: RoleSelectorProps) {
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    if (!newRole.trim()) {
      toast.error('Please enter a role');
      return;
    }

    if (roles.length >= 3) {
      toast.error('Maximum of 3 roles allowed');
      return;
    }

    if (roles.includes(newRole.trim())) {
      toast.error('This role has already been added');
      return;
    }

    onRolesChange([...roles, newRole.trim()]);
    setNewRole('');
  };

  const handleRemoveRole = (roleToRemove: string) => {
    onRolesChange(roles.filter(role => role !== roleToRemove));
  };

  return (
    <div className="space-y-4">
      <Label>Pursuing Roles ({roles.length}/3)</Label>
      
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <Badge
            key={role}
            variant="secondary"
            className="pl-2 pr-1 py-1 flex items-center space-x-1"
          >
            <Briefcase className="h-3 w-3 mr-1" />
            <span>{role}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveRole(role)}
              className="h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <div className="flex space-x-2">
        <Input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Enter role (e.g., Senior Software Engineer)"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddRole();
            }
          }}
        />
        <Button 
          onClick={handleAddRole}
          disabled={!newRole.trim() || roles.length >= 3}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          Add
        </Button>
      </div>
    </div>
  );
}