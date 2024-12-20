import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { User, FileText, Briefcase, Award, Settings } from 'lucide-react';

interface ProfileEditSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: 'basic-info',
    label: 'Basic Information',
    icon: User,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileText,
  },
  {
    id: 'career',
    label: 'Career',
    icon: Briefcase,
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Award,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function ProfileEditSidebar({ activeSection, onSectionChange }: ProfileEditSidebarProps) {
  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Button
            key={section.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              activeSection === section.id
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "hover:bg-muted"
            )}
            onClick={() => onSectionChange(section.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {section.label}
          </Button>
        );
      })}
    </nav>
  );
}