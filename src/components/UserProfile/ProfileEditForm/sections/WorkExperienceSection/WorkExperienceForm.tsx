import { useState, useEffect } from 'react';
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../ui/dialog";
import { Switch } from "../../../../ui/switch";
import type { WorkExperience } from './types';
import { toast } from 'react-hot-toast';

interface WorkExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: WorkExperience) => void;
  initialData?: WorkExperience;
}

export function WorkExperienceForm({
  isOpen,
  onClose,
  onSave,
  initialData
}: WorkExperienceFormProps) {
  const defaultFormData = {
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false
  };

  const [formData, setFormData] = useState<WorkExperience>(initialData || defaultFormData);

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    setFormData(initialData || defaultFormData);
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!formData.company || !formData.position || !formData.location || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.current && !formData.endDate) {
      toast.error('Please provide an end date or mark as current');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Work Experience' : 'Add Work Experience'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Company Name *</Label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="e.g., Acme Corporation"
            />
          </div>

          <div className="space-y-2">
            <Label>Position *</Label>
            <Input
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label>Location *</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>

            {!formData.current && (
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  min={formData.startDate}
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.current}
              onCheckedChange={(checked) => {
                setFormData(prev => ({
                  ...prev,
                  current: checked,
                  endDate: checked ? undefined : prev.endDate
                }));
              }}
            />
            <Label>I currently work here</Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}