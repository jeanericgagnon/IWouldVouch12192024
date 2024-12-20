export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  activities?: string;
  current?: boolean;
}

export interface EducationSectionProps {
  education: Education[];
  onEducationChange: (education: Education[]) => void;
}