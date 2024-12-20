import { ProfileEditTabs } from './ProfileEditTabs';
import type { User } from '../../../types/user';
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { RoleSelector } from './RoleSelector';
import { LocationSelector } from './LocationSelector';
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";

interface ProfileEditFormProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  return (
    <div className="relative min-h-screen pb-20">
      <ProfileEditTabs
        user={user}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}