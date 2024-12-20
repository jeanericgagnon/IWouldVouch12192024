import { useState } from 'react';
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Briefcase, GraduationCap, Award, FileText } from 'lucide-react';
import type { User } from '../../../types/user';

interface ProfileSidebarProps {
  user: User;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const sections = [
    {
      id: 'resume',
      title: 'Resume',
      icon: FileText,
      content: user.resumeUrl,
      show: !!user.resumeUrl
    },
    {
      id: 'about',
      title: 'About',
      icon: Briefcase,
      content: user.bio,
      show: !!user.bio
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: Briefcase,
      content: user.experience,
      show: user.experience?.length > 0
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      content: user.education,
      show: user.education?.length > 0
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: Award,
      content: user.skills,
      show: user.skills?.length > 0
    }
  ].filter(section => section.show);

  const renderDialogContent = (sectionId: string) => {
    switch (sectionId) {
      case 'resume':
        return (
          <div className="flex flex-col items-center justify-center py-4">
            <FileText className="w-16 h-16 text-primary mb-4" />
            <Button
              onClick={() => window.open(user.resumeUrl, '_blank')}
              className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            >
              View Resume
            </Button>
          </div>
        );

      case 'about':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{user.bio}</p>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-6">
            {user.experience?.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} - {
                      exp.current ? 'Present' : 
                      exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            {user.education?.map((edu, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(edu.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} - {
                      edu.current ? 'Present' : 
                      edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            {/* Soft Skills */}
            {user.skills.some(skill => skill.type === 'soft') && (
              <div>
                <h3 className="text-sm font-medium mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills
                    .filter(skill => skill.type === 'soft')
                    .map((skill, index) => (
                      <Badge 
                        key={index}
                        className="bg-[#6b9cc3] text-white"
                      >
                        {skill.name}
                      </Badge>
                    ))
                  }
                </div>
              </div>
            )}

            {/* Hard Skills */}
            {user.skills.some(skill => skill.type === 'hard') && (
              <div>
                <h3 className="text-sm font-medium mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills
                    .filter(skill => skill.type === 'hard')
                    .map((skill, index) => (
                      <Badge 
                        key={index}
                        className="bg-[#52789e] text-white"
                      >
                        {skill.name}
                      </Badge>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <Button
                variant="ghost"
                className="justify-start p-2 hover:bg-transparent flex-1"
                onClick={() => setActiveDialog(section.id)}
              >
                <section.icon className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="font-medium">{section.title}</span>
              </Button>
              {section.id === 'resume' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(user.resumeUrl, '_blank');
                  }}
                  className="ml-2"
                >
                  <FileText className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!activeDialog} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {sections.find(s => s.id === activeDialog)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {activeDialog && renderDialogContent(activeDialog)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}