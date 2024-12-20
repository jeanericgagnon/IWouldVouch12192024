import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FileText, GraduationCap, Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PortfolioSectionProps {
  user: {
    resumeUrl?: string;
    education?: Array<{
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate?: string;
      gpa?: string;
      activities?: string;
      current?: boolean;
    }>;
    experience?: Array<{
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate?: string;
      current?: boolean;
    }>;
    skills?: Array<{
      name: string;
      type: 'soft' | 'hard';
    }>;
    additionalSections?: Array<{
      title: string;
      content: string;
      description?: string;
    }>;
  };
}

export function PortfolioSection({ user }: PortfolioSectionProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-6">
      {/* Resume */}
      {user.resumeUrl && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Resume</CardTitle>
            <Button
              variant="outline"
              onClick={() => window.open(user.resumeUrl, '_blank')}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
          </CardHeader>
        </Card>
      )}

      {/* Education */}
      {user.education && user.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.education.map((edu, index) => (
              <div key={index} className="space-y-2">
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
                {index < user.education.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {user.experience && user.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
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
                {index < user.experience.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
          </CardContent>
        </Card>
      )}

      {/* Additional Sections */}
      {user.additionalSections && user.additionalSections.length > 0 && (
        user.additionalSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.title === 'Personal Website' ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => window.open(section.content, '_blank')}
                  >
                    <span>{section.content}</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  {section.description && (
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  )}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {section.content}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}