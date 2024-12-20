import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BasicInfo } from "./sections/BasicInfo/BasicInfo";
import { Career } from "./sections/Career/Career";
import { Availability } from "./sections/Availability/Availability";
import { AdditionalSectionsManager } from "./sections/AdditionalSectionsManager";
import type { User } from '../../../types/user';

interface ProfileEditTabsProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export function ProfileEditTabs({ user, onSave, onCancel }: ProfileEditTabsProps) {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState(user);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <div className="space-x-2">
          <Button 
            type="button"
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={() => onSave(formData)}
            className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="availability">Job Search</TabsTrigger>
          <TabsTrigger value="additional">Additional Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <BasicInfo data={formData} onChange={handleFieldChange} />
        </TabsContent>

        <TabsContent value="career">
          <Career data={formData} onChange={handleFieldChange} />
        </TabsContent>

        <TabsContent value="availability">
          <Availability data={formData} onChange={handleFieldChange} />
        </TabsContent>

        <TabsContent value="additional">
          <AdditionalSectionsManager
            sections={formData.additionalSections || []}
            onSectionsChange={(sections) => handleFieldChange('additionalSections', sections)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}