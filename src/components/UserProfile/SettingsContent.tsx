import { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Sun, Moon } from 'lucide-react';
import { User } from '../../types/user';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { ContactSection } from './sections/ContactSection';
import { SkillsSection } from './sections/SkillsSection';
import { AdditionalSectionsManager } from './sections/AdditionalSectionsManager';
import { DangerZone } from './sections/DangerZone';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';

interface SettingsContentProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  hasUnsavedChanges: boolean;
  onSave: () => void;
}

export function SettingsContent({ user, onUpdateUser, hasUnsavedChanges, onSave }: SettingsContentProps) {
  const { theme, setTheme } = useTheme();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  const handleUpdateUser = (updates: Partial<User>, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    onUpdateUser(updates);
  };

  const handleDeleteAccount = async () => {
    // Implement account deletion logic here
    // This would typically involve calling an API endpoint
    throw new Error('Account deletion not implemented');
  };

  return (
    <div className="space-y-8" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button 
          type="button"
          disabled={!hasUnsavedChanges}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

      <BasicInfoSection user={user} onUpdateUser={handleUpdateUser} />
      <ContactSection user={user} onUpdateUser={handleUpdateUser} />
      
      <SkillsSection 
        skills={user.skills || []} 
        onSkillsChange={(skills) => handleUpdateUser({ skills })} 
      />

      <AdditionalSectionsManager
        sections={user.additionalSections || []}
        onSectionsChange={(sections) => handleUpdateUser({ additionalSections: sections })}
      />

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the application looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme('light');
                }}
                className={theme === 'light' ? 'bg-[#52789e] hover:bg-[#6b9cc3]' : ''}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                type="button"
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme('dark');
                }}
                className={theme === 'dark' ? 'bg-[#52789e] hover:bg-[#6b9cc3]' : ''}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <DangerZone onDeleteAccount={handleDeleteAccount} />
    </div>
  );
}