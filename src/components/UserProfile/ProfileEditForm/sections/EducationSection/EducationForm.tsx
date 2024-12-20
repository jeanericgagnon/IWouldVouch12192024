import { useState, useEffect } from 'react';
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { ScrollArea } from "../../../../ui/scroll-area";
import { Textarea } from "../../../../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../ui/dialog";
import { Switch } from "../../../../ui/switch";
import type { Education } from './types';
import { toast } from 'react-hot-toast';

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (education: Education) => void;
  initialData?: Education;
}

export function EducationForm({
  isOpen,
  onClose,
  onSave,
  initialData
}: EducationFormProps) {
  const defaultFormData = {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    activities: '',
    current: false
  };

  const [formData, setFormData] = useState<Education>(initialData || defaultFormData);

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    setFormData(initialData || defaultFormData);
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree || !formData.field || !formData.startDate) {
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Education' : 'Add Education'}</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto px-1">
          <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Institution Name *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              placeholder="e.g., Stanford University"
            />
          </div>

          <div className="space-y-2">
            <Label>Degree *</Label>
            <Input
              value={formData.degree}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              placeholder="e.g., Bachelor of Science"
            />
          </div>

          <div className="space-y-2">
            <Label>Field of Study *</Label>
            <Input
              value={formData.field}
              onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
              placeholder="e.g., Computer Science"
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
            <Label>Currently studying here</Label>
          </div>

          <div className="space-y-2">
            <Label>GPA (Optional)</Label>
            <Input
              value={formData.gpa}
              onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
              placeholder="e.g., 3.8/4.0"
            />
          </div>

          <div className="space-y-2">
            <Label>Activities & Societies (Optional)</Label>
            <Textarea
              value={formData.activities}
              onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
              placeholder="List relevant activities, societies, or achievements"
              className="min-h-[100px]"
            />
          </div>
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