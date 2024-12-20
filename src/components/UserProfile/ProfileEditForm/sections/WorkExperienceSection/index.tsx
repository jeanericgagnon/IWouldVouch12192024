import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { Plus, Briefcase, Calendar, MapPin, X } from 'lucide-react';
import { WorkExperienceForm } from './WorkExperienceForm';
import type { WorkExperience, WorkExperienceSectionProps } from './types';
import { toast } from 'react-hot-toast';

export function WorkExperienceSection({ experience, onExperienceChange }: WorkExperienceSectionProps) {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveExperience = (newExperience: WorkExperience) => {
    if (editingIndex !== null) {
      const updatedExperience = [...experience];
      updatedExperience[editingIndex] = newExperience;
      onExperienceChange(updatedExperience);
      setEditingIndex(null);
      toast.success('Work experience updated successfully!');
    } else {
      if (experience.length >= 5) {
        toast.error('Maximum of 5 work experiences allowed');
        return;
      }
      onExperienceChange([...experience, newExperience]);
      toast.success('Work experience added successfully!');
    }
    setIsAddingExperience(false);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    onExperienceChange(updatedExperience);
    toast.success('Work experience removed successfully!');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button
          type="button"
          onClick={() => setIsAddingExperience(true)}
          disabled={experience.length >= 5}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No work experience entries yet
          </p>
        ) : (
          experience.map((exp, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-4">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingIndex(index);
                      setIsAddingExperience(true);
                    }}
                    className="mr-1"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-medium">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate && formatDate(exp.endDate)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <WorkExperienceForm
          isOpen={isAddingExperience}
          onClose={() => {
            setIsAddingExperience(false);
            setEditingIndex(null);
          }}
          onSave={handleSaveExperience}
          initialData={editingIndex !== null ? experience[editingIndex] : undefined}
        />
      </CardContent>
    </Card>
  );
}