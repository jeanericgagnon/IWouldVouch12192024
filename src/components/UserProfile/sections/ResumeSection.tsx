import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Button } from "../../ui/button";
import { FileText, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ResumeSectionProps {
  resumeUrl?: string;
  onResumeChange: (file: File | null) => void;
}

export function ResumeSection({ resumeUrl, onResumeChange }: ResumeSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
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

    onResumeChange(file);
    toast.success('Resume uploaded successfully!');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>Upload your resume in PDF or Word format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                {resumeUrl ? 'Update Resume' : 'Upload Resume'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Drag and drop your resume here, or click to select a file
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </div>

        {resumeUrl && (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Current Resume</p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(resumeUrl, '_blank')}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onResumeChange(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}