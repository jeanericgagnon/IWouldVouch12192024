import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { ExternalLink } from 'lucide-react';
import type { User } from '../../../types/user';

interface AdditionalInfoSectionProps {
  user: User;
}

export function AdditionalInfoSection({ user }: AdditionalInfoSectionProps) {
  if (!user.additionalSections?.length) return null;

  return (
    <div className="space-y-6">
      {user.additionalSections.map((section, index) => (
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
      ))}
    </div>
  );
}