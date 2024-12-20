import { useState } from 'react';
import { Button } from "../../../../ui/button";
import { Label } from "../../../../ui/label";
import { RoleInput } from './RoleInput';
import { RoleList } from './RoleList';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Role } from './types';

interface RoleSelectorProps {
  roles: Role[];
  onRolesChange: (roles: Role[]) => void;
}

export function RoleSelector({ roles, onRolesChange }: RoleSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddRole = () => {
    if (roles.length >= 3) {
      setError('Maximum of 3 roles allowed');
      return;
    }

    if (!inputValue.trim()) {
      setError('Please enter a role');
      return;
    }

    const [title, level] = inputValue.split(',').map(s => s.trim());
    
    if (!title) {
      setError('Please enter at least a role title');
      return;
    }

    const newRole = {
      title,
      level: level || undefined,
      formatted: level ? `${title}, ${level}` : title
    };

    if (roles.some(role => role.formatted.toLowerCase() === newRole.formatted.toLowerCase())) {
      setError('This role has already been added');
      return;
    }

    onRolesChange([...roles, newRole]);
    setInputValue('');
    setError(null);
  };

  const handleRemoveRole = (index: number) => {
    const newRoles = [...roles];
    newRoles.splice(index, 1);
    onRolesChange(newRoles);
    setError(null);
  };

  const handleClearAll = () => {
    onRolesChange([]);
    setInputValue('');
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base">
          Pursuing Roles ({roles.length}/3)
        </Label>
        {roles.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <RoleList 
        roles={roles}
        onRemove={handleRemoveRole}
      />

      {roles.length < 3 && (
        <RoleInput
          value={inputValue}
          onChange={setInputValue}
          onAdd={handleAddRole}
          error={error}
        />
      )}
    </div>
  );
}