import { ProfileEditTabs } from './ProfileEditTabs';
import type { User } from '../../../types/user';
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { EducationSection } from './EducationSection';
import { WorkExperienceSection } from './WorkExperienceSection';
import { SkillsSection } from './SkillsSection';

interface ProfileEditFormProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

interface CareerSectionProps {
  data: {
    education: any[];
    experience: any[];
    skills: any[];
  };
  onChange: (field: string, value: any) => void;
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

export function Career({ data, onChange }: CareerSectionProps) {
  return (
    <div className="space-y-6">
      <EducationSection
        education={data.education || []}
        onEducationChange={(education) => onChange('education', education)}
      />

      <WorkExperienceSection
        experience={data.experience || []}
        onExperienceChange={(experience) => onChange('experience', experience)}
      />

      <SkillsSection
        skills={data.skills || []}
        onSkillsChange={(skills) => onChange('skills', skills)}
      />
    </div>
  );
}