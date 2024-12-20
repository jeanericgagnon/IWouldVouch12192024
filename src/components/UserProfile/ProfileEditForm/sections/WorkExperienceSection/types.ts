export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

export interface WorkExperienceSectionProps {
  experience: WorkExperience[];
  onExperienceChange: (experience: WorkExperience[]) => void;
}