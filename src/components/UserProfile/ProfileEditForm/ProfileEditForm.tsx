import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { ProfileEditSidebar } from './ProfileEditSidebar';
import { BasicInfo } from "./sections/BasicInfo/BasicInfo";
import { Career } from "./sections/Career/Career";
import { SkillsSection } from './sections/SkillsSection';
import { AdditionalSectionsManager } from './sections/AdditionalSectionsManager';
import type { User } from '../../../types/user';

interface ProfileEditFormProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    onCancel();
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => onSave(formData)}
                className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-8">
            <ProfileEditSidebar
              activeSection={activeTab}
              onSectionChange={setActiveTab}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'basic-info' && (
            <BasicInfo data={formData} onChange={handleFieldChange} />
          )}
          {activeTab === 'resume' && (
            <Card>
              <CardContent className="pt-6">
                {/* Resume section content */}
              </CardContent>
            </Card>
          )}
          {activeTab === 'career' && (
            <Career data={formData} onChange={handleFieldChange} />
          )}
          {activeTab === 'skills' && (
            <SkillsSection
              skills={formData.skills || []}
              onSkillsChange={(skills) => handleFieldChange('skills', skills)}
            />
          )}
          {activeTab === 'settings' && (
            <AdditionalSectionsManager
              sections={formData.additionalSections || []}
              onSectionsChange={(sections) => handleFieldChange('additionalSections', sections)}
            />
          )}
        </div>
      </div>
    </div>
  );
}