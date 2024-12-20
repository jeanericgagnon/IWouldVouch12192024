import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, Upload, X } from 'lucide-react';
import { EducationSection } from '../EducationSection';
import { WorkExperienceSection } from '../WorkExperienceSection';
import { SkillsSection } from '../SkillsSection';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

interface CareerSectionProps {
  data: {
    resumeUrl?: string;
    education: any[];
    experience: any[];
    skills: any[];
    resumeUrl?: string;
  };
  onChange: (field: string, value: any) => void;
}

export function Career({ data, onChange }: CareerSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log('Resume URL:', data.resumeUrl); // Debug log

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.type)) {
      toast.error('Only PDF and Word documents are allowed');
      return;
    }

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    onChange('resumeUrl', fileUrl);
    toast.success('Resume uploaded successfully!');
  };

  const handleRemoveResume = () => {
    onChange('resumeUrl', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Resume removed');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                {data.resumeUrl ? 'Update Resume' : 'Upload Resume'}
              </Button>

              {data.resumeUrl && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => window.open(data.resumeUrl, '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleRemoveResume}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </CardContent>
      </Card>

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