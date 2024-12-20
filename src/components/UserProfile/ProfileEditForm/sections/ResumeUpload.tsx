import { useRef } from 'react';
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ResumeUploadProps {
  currentResumeUrl?: string;
  onResumeChange: (file: File | null) => void;
}

export function ResumeUpload({ currentResumeUrl, onResumeChange }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  const handleRemoveResume = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onResumeChange(null);
    toast.success('Resume removed successfully!');
  };

  return (
    <div className="space-y-2">
      <Label>Resume</Label>
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          {currentResumeUrl ? 'Update Resume' : 'Upload Resume'}
        </Button>
        {currentResumeUrl && (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open(currentResumeUrl, '_blank')}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
            <Button
              type="button"
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
  );
}