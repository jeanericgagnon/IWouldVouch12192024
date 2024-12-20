import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { ScrollArea } from "../../../../ui/scroll-area";
import { Plus, GraduationCap, Calendar, X } from 'lucide-react';
import { EducationForm } from './EducationForm';
import type { Education, EducationSectionProps } from './types';
import { toast } from 'react-hot-toast';

export function EducationSection({ education, onEducationChange }: EducationSectionProps) {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveEducation = (newEducation: Education) => {
    if (editingIndex !== null) {
      const updatedEducation = [...education];
      updatedEducation[editingIndex] = newEducation;
      onEducationChange(updatedEducation);
      setEditingIndex(null);
      toast.success('Education updated successfully!');
    } else {
      if (education.length >= 5) {
        toast.error('Maximum of 5 education entries allowed');
        return;
      }
      onEducationChange([...education, newEducation]);
      toast.success('Education added successfully!');
    }
    setIsAddingEducation(false);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    onEducationChange(updatedEducation);
    toast.success('Education removed successfully!');
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
        <CardTitle>Education</CardTitle>
        <Button
          type="button"
          onClick={() => setIsAddingEducation(true)}
          disabled={education.length >= 5}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No education entries yet
          </p>
        ) : (
          education.map((edu, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-4">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingIndex(index);
                      setIsAddingEducation(true);
                    }}
                    className="mr-1"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-medium">{edu.institution}</h4>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} in {edu.field}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : edu.endDate && formatDate(edu.endDate)}
                    </div>
                    {edu.gpa && (
                      <p className="text-sm">GPA: {edu.gpa}</p>
                    )}
                    {edu.activities && (
                      <p className="text-sm text-muted-foreground">{edu.activities}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <EducationForm
          isOpen={isAddingEducation}
          onClose={() => {
            setIsAddingEducation(false);
            setEditingIndex(null);
          }}
          onSave={handleSaveEducation}
          initialData={editingIndex !== null ? education[editingIndex] : undefined}
        />
      </CardContent>
    </Card>
  );
}